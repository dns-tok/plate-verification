import React from "react";
import PublicLayout from "../../components/layout/PublicLayout";

const Blog = () => {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog Placa Verificada
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Dicas, novidades e informações sobre verificação veicular
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="w-full h-[800px] lg:h-[900px] rounded-lg overflow-hidden shadow-xl">
              <iframe
                src="https://www.placaverificada.com.br/blog/"
                title="Blog Placa Verificada"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para verificar seu veículo?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Acesse nossa plataforma e obtenha relatórios completos
            </p>
            <a
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Verificar Agora
            </a>
          </div>
        </section>
      </div>
    </PublicLayout>
  );
};

export default Blog;