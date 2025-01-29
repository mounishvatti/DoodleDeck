import { RoomCanvas } from "@/components/RoomCanvas";


export default function CanvasPage({ params }: any) {
    return <RoomCanvas roomId={params.roomId as string} />;
}
