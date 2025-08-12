export default function MapEmbed() {
    const q = encodeURIComponent("F398+MR2 Tsovazard Armenia");
    const src = `https://www.google.com/maps?q=${q}&output=embed`;
    return (
        <div style={{marginTop:16}}>
            <h3>Գտնվելու վայրը / Локация</h3>
            <div style={{position:"relative", paddingTop:"56.25%"}}>
                <iframe
                    title="Voske Loxap Location"
                    src={src}
                    style={{position:"absolute", top:0,left:0,width:"100%",height:"100%",border:0}}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <p>Ոսկյա լողափ · F398+MR2 · Tsovazard, Armenia</p>
        </div>
    );
}
