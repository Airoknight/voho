import HostelDetailsClient from "./hostel-details";

export function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
        { id: '3' },
        { id: '4' },
        { id: '5' },
        { id: '6' },
    ];
}

export default async function HostelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <HostelDetailsClient id={id} />;
}
