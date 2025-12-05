import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gallery-800 text-gallery-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Artist Image */}
          <div className="relative order-2 md:order-1">
             <div className="absolute top-[-20px] left-[-20px] w-full h-full border border-gallery-gold opacity-30"></div>
             <img 
               src="/artist.jpeg" 
               alt="Benard Mugambi in Studio" 
               className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-1000 relative z-10"
             />
          </div>

          {/* Text Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-gallery-gold text-sm uppercase tracking-widest mb-4">The Artist</h2>
            <h3 className="font-serif text-4xl md:text-5xl mb-8 leading-tight">Finding Balance in <br/> The Chaos</h3>
            
            <div className="space-y-6 font-light text-lg text-gallery-100/80">
              <p>
                Benard Mugambi is a contemporary artist whose work navigates the delicate boundary between structural realism and emotional abstraction. Based in Seattle, his studio practice is informed by the juxtaposition of the natural world and urban decay.
              </p>
              <p>
                "My work is not about depicting what is seen, but what is felt in the spaces between moments. The silence of a city at 3 AM, the violent bloom of a spring flower, the stoic permanence of bronze."
              </p>
              <p>
                
              </p>
            </div>
            
            <div className="mt-12">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Signature_sample.svg" alt="Signature" className="h-12 invert opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};