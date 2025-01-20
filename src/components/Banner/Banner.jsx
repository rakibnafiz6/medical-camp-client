import { useState } from "react";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import "./Banner.css"

const Banner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const [sliderRef, instanceRef] = useKeenSlider({
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    })



    function Arrow(props) {
        const disabled = props.disabled ? " arrow--disabled" : ""
        return (
          <svg
            onClick={props.onClick}
            className={`arrow ${
              props.left ? "arrow--left" : "arrow--right"
            } ${disabled}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            {props.left && (
              <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
            )}
            {!props.left && (
              <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
            )}
          </svg>
        )
      }

    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    <div className="keen-slider__slide number-slide1">
                      <div className="flex justify-center items-center flex-col">
                      <img src="https://i.ibb.co.com/rcJdfc2/download.jpg"
                       className="h-40 w-72"
                       alt="" />
                       <h2>Camp A - A Life Saved</h2>
                       <p>Over 100 participants joined to save lives through this impactful camp.</p>
                      </div>
                    </div>
                    <div className="keen-slider__slide number-slide2">
                       <div className="flex justify-center items-center flex-col">
                       <img src="https://i.ibb.co.com/ypc7n09/istockphoto-1249432480-612x612.jpg" className="w-72 h-40" alt="" />
                        <h2>Camp B - Medical Aid Delivered</h2>
                        <p>Doctors and volunteers worked tirelessly to provide free healthcare.</p>
                       </div>
                    </div>
                    <div className="keen-slider__slide number-slide3">
                       <div className="flex justify-center items-center flex-col">
                       <img src="https://i.ibb.co.com/r6FMkwQ/istockphoto-1757748009-612x612.jpg" className="h-40 w-72" alt="" />
                        <h2>Camp C - Health Awareness</h2>
                        <p>Spreading awareness about common diseases and preventive measures.</p>
                       </div>
                    </div>
                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                            disabled={currentSlide === 0}
                        />

                        <Arrow
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.next()
                            }
                            disabled={
                                currentSlide ===
                                instanceRef.current.track.details.slides.length - 1
                            }
                        />
                    </>
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots">
                    {[
                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        )
                    })}
                </div>
            )}
        </>
    );
};

export default Banner;