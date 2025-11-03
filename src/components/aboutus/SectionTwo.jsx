import React from "react";

export default function AboutSectionTwo() {
    return (
        <div className="py-12"
        style={{
            background: "linear-gradient(244deg, #FFF 85.74%, #194D9A 100%)"
        }}
        >
            <h3
                style={{
                    textAlign: "center",
                    color: "#194D9A",
                    fontFamily: "Poppins",
                    fontSize: "40px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "48px",
                    marginBottom: "48px"
                }}
            >
                Our Mission
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-12 gap-8 items-start w-full px-8 lg:px-20">
                {/* First Column - Image with Text Overlay */}
                <div className="lg:col-span-1 xl:col-span-5 h-full relative">
                    <img 
                        src="/mission-1.png" 
                        alt="Description of image 1" 
                        className="w-full h-full object-cover rounded-lg" 
                    />
                    <div className=" absolute top-0 h-full w-full px-8 py-8"
                        // style={{
                        //     backgroundImage: 'url("/mission-1.png")',
                        //     backgroundSize: "cover",
                        //     backgroundPosition: "center",
                        //     // borderRadius: "16px",
                        //     // display: "flex",
                        //     // flexDirection: "column",
                        //     // justifyContent: "center",
                        //     // alignItems: "center",
                        // }}
                    >
                        {/* <p style={{
                            color: "#1D1D1D",
                            fontFamily: "Open Sans",
                            fontSize: "15px",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: "30px"
                        }}>
                            Whether in a transaction between individuals or with dealerships,
                            <br />
                            <br />
                            Placa Verificada acts as a digital shield, ensuring that everyone involved has full clarity before closing the deal.
                            <br />
                            <br />
                            Every car has a story — we make sure you know it. Whether you're buying or selling, Placa Verificada gives you confidence through transparency, helping you make safe and informed decisions.
                        </p> */}
                    </div>
                </div>

                {/* Second Column - Video */}
                <div className="lg:col-span-1 xl:col-span-4">
                    <video 
                        src="/mission-2.mp4" 
                        className="w-full h-full object-cover rounded-lg" 
                        autoPlay 
                        loop 
                        muted
                        playsInline
                    />
                </div>

                {/* Third Column - Car Image and Text */}
                <div className="lg:col-span-2 xl:col-span-3">
                    <img 
                        src="/about-car.png" 
                        alt="Description of image 3" 
                        className="w-full h-auto rounded-lg" 
                    />

                    <p style={{
                        color: "#1D1D1D",
                        fontFamily: "Open Sans",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "24px",
                        marginTop: "16px"
                    }}>
                        With just a license plate number, users can instantly generate a complete report with reliable information about the vehicle's history, risks, debts, auction participation, and even its market value estimate.
                        <br />
                        <br />
                        Just enter the license plate and get a full, reliable report — uncover the vehicle's history, risks, debts, auctions, and real market value.
                    </p>

                    <img 
                        src="/number-plate.png" 
                        alt="Description of image 4" 
                        className="w-full h-auto mt-4 rounded-lg" 
                    />
                </div>
            </div>
        </div>
    );
}