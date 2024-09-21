import {
    createClient,
    RealtimeChannel,
    SupabaseClient
  } from "@supabase/supabase-js";
  import { jwtVerify } from "jose";
  import { useEffect, useRef, useState } from "react";
  
  interface UseClientRealtimeProps {
    WIBU_REALTIME_TOKEN: string;
    project: "sdm" | "hipmi";
  }
  
  export function useWibuRealtime({
    WIBU_REALTIME_TOKEN,
    project
  }: UseClientRealtimeProps) {
    const supabaseRef = useRef<SupabaseClient | null>(null);
    const channelRef = useRef<RealtimeChannel | null>(null);
    const [currentData, setCurrentData] = useState<any | null>(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const initializeRealtime = async () => {
        try {
  
          const token =
            "eyJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3p5aml4c2J1c2diYnR2am9namhvLnN1cGFiYXNlLmNvIiwia2V5IjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW5wNWFtbDRjMkoxYzJkaVluUjJhbTluYW1odklpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTWpZM016azFORFVzSW1WNGNDSTZNakEwTWpNeE5UVTBOWDAuakhOVzVQd2hqLUtYVVFPTXF6SUxhQXo2MmszeGxLRUw1WEtFNHhvUjdYYyJ9.liCfw07nhEx_us1tV82I_osAQZxcMlolsOBA016A6S0";
  
          const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(WIBU_REALTIME_TOKEN)
          );
  
          const { url, key } = payload as any;
          const supabase = createClient(url, key);
          supabaseRef.current = supabase;
  
          const channel = supabase
            .channel(project)
            .on(
              "postgres_changes",
              { event: "*", schema: "public", table: project },
              (payload: any) => {
                const data = payload.new?.data ?? null;
                if (isMounted) {
                  setCurrentData(data);
                }
              }
            )
            .subscribe();
  
          channelRef.current = channel;
        } catch (error) {
          console.error("Error initializing realtime:", error);
        }
      };
  
      initializeRealtime();
  
      return () => {
        isMounted = false;
        if (channelRef.current && supabaseRef.current) {
          supabaseRef.current.removeChannel(channelRef.current);
          channelRef.current = null;
        }
        supabaseRef.current = null;
      };
    }, [WIBU_REALTIME_TOKEN, project]);
  
    async function upsertData(val: Record<string, any>) {
      const supabase = supabaseRef.current;
      if (!supabase) {
        console.error("Supabase client not initialized");
        return null;
      }
  
      try {
        const { status, error } = await supabase.from(project).upsert({
          id: "123e4567-e89b-12d3-a456-426614174000",
          data: val
        });
  
        if (error) {
          console.error("Error upserting data:", error);
          return null;
        } else {
          return {
            status,
            val
          };
        }
      } catch (error) {
        console.error("Error performing upsert:", error);
        return null;
      }
    }
  
    return [currentData, upsertData] as const;
  }
  