import { useRef } from 'react';

export default function GravityGrill() {
    const iframeRef = useRef(null);

    return (
        <div>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                <iframe
                    ref={iframeRef}
                    src="website/index.html"
                    style={
                        { width: '100%', height: '100%', border: 'none' }
                    }
                />
            </div>
        </div>
    )
}
