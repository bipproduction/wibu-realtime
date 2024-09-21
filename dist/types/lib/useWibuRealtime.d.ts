interface UseClientRealtimeProps {
    WIBU_REALTIME_TOKEN: string;
    project: "sdm" | "hipmi";
}
export declare function useWibuRealtime({ WIBU_REALTIME_TOKEN, project }: UseClientRealtimeProps): readonly [any, (val: Record<string, any>) => Promise<{
    status: number;
    val: Record<string, any>;
} | null>];
export {};
