import Carousel from 'react-bootstrap/Carousel'
import "@/styles/common/CarouselBanner.css"

function CarouselComponent() {
    return (
        <Carousel fade>
            <Carousel.Item>
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    className="d-block w-100"
                    src="https://vuoncayviet.com/data/aditems/93/vuon-cay-viet-banner-new.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                    className="d-block w-100"
                    src="https://www.nylon.com.sg/wp-content/uploads/2020/05/indoor-plants-banner.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;