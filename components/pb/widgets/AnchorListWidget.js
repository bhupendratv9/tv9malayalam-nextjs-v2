import Image from "next/image";

export default function AnchorListWidget() {
  return (
    <div className="anchorsListing_Wrapper">
      <figure>
        <a href="/anchors/anjali-kumari-595989.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/anjali-kumar.jpg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>अंजली कुमारी</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/karuna-shankar-sharma-595993.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/karuna-shankar.jpg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>करुणा शंकर शर्मा</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/gaurav-agrawal-595992.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/gaurav-agrawal.jpg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>गौरव अग्रवाल</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/nidhi-vasandani-595991.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/whatsapp-image-2024-10-23-at-12.13.59-pm.jpeg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>निधि वासंदानी</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/ravi-mishra-595985.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/whatsapp-image-2024-10-22-at-3.47.19-pm.jpeg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>रवि मिश्रा</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/samir-abbas-595984.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/samir-abbas.jpg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>समीर अब्बास</h3>
          </div>
        </a>
      </figure>
      <figure>
        <a href="/anchors/surbhi-sharma-595994.html">
          <div className="border-color-wrap">
            <div className="imgCont">
              <Image
                alt="user"
                src="https://images.tv9hindi.com/wp-content/uploads/2024/10/surabhi.jpg"
                height={150}
                width={150}
                loading="lazy"
              />
            </div>
          </div>
          <div className="card_title">
            <h3>सुरभि शर्मा</h3>
          </div>
        </a>
      </figure>
    </div>
  );
}
