import React from "react";



export default function AboutSectionOne() {



    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
                <div className="flex flex-col relative pt-14 pb-10 px-16 col-span-1 lg:col-span-7">
                    <img src="/yellow-bg.png" alt="About Us" className="absolute inset-0 h-full z-[-1] left-0 bottom-0 object-contain" />
                    <div className="z-[1] overflow-hidden"
                        style={{
                            borderRadius: "40px 100px"
                        }}
                    >
                        <img src="/golden-car.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
                <div className="flex flex-col col-span-1 lg:col-span-5 px-10 py-10">
                    <h3 className="text-2xl font-bold mb-4 text-center"
                        style={{
                            color: "#194D9A",
                            leadingTrim: "both",
                            textEdge: "cap",
                            fontFamily: "Poppins",
                            fontSize: "40px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "53px"
                        }}
                    >Placa Verificada</h3>
                    <p className="text-center lg:text-left" style={{
                        color: "#000",
                        // textAlign: "justify",
                        fontFamily: "Open Sans",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "26px" /* 108.333% */
                    }}>
A Placa Verificada foi criada com um propósito simples e essencial: proteger quem compra ou vende veículos usados.                        <br/>
                        <br/>
Sabemos que por trás do sonho de ter um carro, muitos brasileiros acabam se deparando com surpresas desagradáveis ​​, veículos com dívidas pendentes, acidentes ocultos, histórico de leilão, dados adulterados ou problemas legais que só aparecem depois da compra                               </p>
                </div>
            </div>
        </>
    );
}