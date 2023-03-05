import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const iframeRef = useRef(null);

  return (
    <div>
      <div className='fixed top-0 left-0 right-0 bottom-0'>
        <iframe
          ref={iframeRef}
          src="threejs/dist/index.html"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
      <div className='fixed top-5 left-5 w-full font-vollkron text-center'>
        <div className='text-[40px] font-bold text-white'>
          Welcome to Gravity Grills
        </div>
      </div>
      <div className='fixed bottom-10 w-full text-center font-vollkron'>
        <div className='text-4xl text-white'>
          <button onClick={() => router.push('/gravity-grill')} className="border py-2 px-4 rounded-lg">
            Explore More!
          </button>
        </div>
      </div>
    </div>
  );
}
