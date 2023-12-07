    import Carousel from "react-multi-carousel";
    import "react-multi-carousel/lib/styles.css";
    import "@/styles/common/CarouselBanner.css";
    import CardDiscount from "./common/CardDiscount";

    function CarouselComponent({ listDiscounts }: { listDiscounts: any }) {
        console.log("listDiscounts", listDiscounts);
        return (
            <Carousel
                additionalTransfrom={0}
                arrows={false}
                autoPlaySpeed={3000}
                centerMode
                className=""
                containerClass="container"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 3,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 2,
                        partialVisibilityGutter: 30
                    }
                }}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
            >

                {
                    listDiscounts.map((discount: any, index: number) => {
                        return (
                            <div style={{
                                marginRight: '12px',
                            }} key={index}>
                                <CardDiscount discount={discount} />
                            </div>
                        )
                    })
                }
            </Carousel>
        );
    }

    export default CarouselComponent;