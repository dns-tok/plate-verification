import React, { useEffect } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import { useScrollToTop } from "../../utils/scrollUtils";

const TermsOfUse = () => {
  const scrollToTopOnMount = useScrollToTop();

  useEffect(() => {
    scrollToTopOnMount();
  }, [scrollToTopOnMount]);

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 px-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Termos e Condições de Uso do Serviço
              </h1>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  1. Definições
                </h2>
                <ul className="list-disc list-inside text-gray-800 space-y-2 ms-6">
                  <li>
                    <strong>Aceite eletrônico:</strong> Confirmação digital de
                    que o CONTRATANTE concorda com os termos deste contrato.
                  </li>
                  <li>
                    <strong>Banco de dados:</strong> Conjunto estruturado de
                    informações, pessoais ou não, armazenadas em formato físico
                    ou eletrônico.
                  </li>
                  <li>
                    <strong>Dados pessoais:</strong> Informações que identificam
                    ou podem identificar uma pessoa física.
                  </li>
                  <li>
                    <strong>Endereço eletrônico:</strong> E-mail fornecido pelo
                    CONTRATANTE no momento do cadastro.
                  </li>
                  <li>
                    <strong>Sistema Placa Verificada:</strong> Plataforma
                    tecnológica desenvolvida pela CONTRATADA, que permite
                    consultas veiculares mediante licença de uso de software.
                  </li>
                  <li>
                    <strong>Verificação eletrônica:</strong> Forma digital de
                    acesso às informações sobre veículos pelo CONTRATANTE.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  2. Premissas
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>2.1.</strong> A CONTRATADA desenvolveu o Sistema
                    Placa Verificada, que permite aos usuários realizar
                    consultas veiculares com base em dados obtidos de fontes
                    públicas e privadas.
                  </p>
                  <p>
                    <strong>2.2.</strong> O CONTRATANTE manifesta interesse em
                    acessar os dados disponibilizados pela plataforma.
                  </p>
                  <p>
                    <strong>2.3.</strong> As PARTES desejam formalizar o
                    presente CONTRATO DE PRESTAÇÃO DE SERVIÇOS, que será regido
                    pelas cláusulas a seguir.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  3. Das Partes
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>3.1.</strong> São partes deste instrumento:
                  </p>
                  <p>
                    <strong> Prototyp3 Serviços de Informática LTDA</strong>,
                    inscrita no CNPJ/ME sob nº{" "}
                    <strong>62.718.731/0001-24</strong>, com sede na{" "}
                    <strong>
                      AVENIDA PAULISTA, 1471 - CONJ 511, CEP 01311-927, BELA
                      VISTA, SÃO PAULO – SP
                    </strong>
                    , doravante denominada <strong>CONTRATADA</strong>; e o
                    indivíduo identificado como <strong>CONTRATANTE</strong>,
                    referidos individualmente como PARTE e conjuntamente como
                    PARTES.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  4. Declarações
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>O CONTRATANTE declara, sob responsabilidade legal, que:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      Tem mais de 18 anos e está apto a contratar e utilizar os
                      serviços da CONTRATADA.
                    </li>
                    <li>
                      O aceite eletrônico será realizado no momento do cadastro,
                      sendo considerado válido e vinculativo.
                    </li>
                    <li>
                      É responsável exclusivo por seu login e senha, devendo
                      mantê-los em segurança.
                    </li>
                    <li>
                      Utilizará os serviços conforme os termos deste contrato,
                      as orientações da plataforma e a legislação vigente.
                    </li>
                    <li>
                      Informará dados cadastrais verdadeiros e atualizados,
                      assumindo responsabilidade por sua veracidade.
                    </li>
                    <li>
                      É financeiramente responsável pelos serviços contratados.
                    </li>
                    <li>
                      Reconhece que a CONTRATADA fornece informações sobre
                      veículos, não se responsabilizando por decisões tomadas
                      com base nesses dados.
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  5. Objeto
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>5.1.</strong> Este contrato tem como finalidade
                    conceder ao CONTRATANTE uma licença de uso do software para
                    acesso ao Sistema Placa Verificada.
                  </p>
                  <p>
                    <strong>5.1.1.</strong> As consultas veiculares apresentam
                    dados como informações cadastrais, débitos e registros
                    diversos, conforme o tipo de consulta contratada.
                  </p>
                  <p>
                    <strong>5.1.2.</strong> A CONTRATADA oferece diferentes
                    modalidades de consulta, com dados e preços específicos,
                    disponíveis para visualização na plataforma.
                  </p>
                  <p>
                    <strong>5.1.3.</strong> A CONTRATADA poderá criar, modificar
                    ou descontinuar tipos de consulta e seus respectivos preços,
                    sem aviso prévio.
                  </p>
                  <p>
                    <strong>5.2.</strong> A CONTRATADA possui direito de uso e
                    distribuição de dados obtidos de terceiros, não se
                    responsabilizando por seu conteúdo ou atualizações.
                  </p>
                  <p>
                    <strong>5.2.1.</strong> Nem todos os dados estão disponíveis
                    para todos os veículos. A ausência de informações
                    específicas não garante restituição, exceto nos casos
                    previstos.
                  </p>
                  <p>
                    <strong>5.2.2.</strong> Em caso de indisponibilidade
                    temporária, o CONTRATANTE poderá solicitar reprocessamento
                    das informações em até 24 horas.
                  </p>
                  <p>
                    <strong>5.2.3.</strong> Solicitações de reembolso devem ser
                    feitas pelos canais oficiais da CONTRATADA.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  6. Cadastro
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>6.1.</strong> O CONTRATANTE deverá se cadastrar na
                    plataforma, informando dados obrigatórios e criando login e
                    senha.
                  </p>
                  <p>
                    <strong>6.2.</strong> A senha será enviada ao e-mail
                    cadastrado e poderá ser alterada na área logada.
                  </p>
                  <p>
                    <strong>6.3.</strong> O cadastro implica aceite integral dos
                    termos deste contrato.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  7. Contratação de Consultas
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>7.1.</strong> As consultas podem ser gratuitas ou
                    pagas.
                  </p>
                  <p>
                    <strong>7.2.</strong> As consultas pagas exigem aquisição
                    prévia de créditos.
                  </p>
                  <p>
                    <strong>7.2.1.</strong> Os créditos serão liberados após
                    confirmação do pagamento.
                  </p>
                  <p>
                    <strong>7.2.2.</strong> Validade dos créditos: 12 meses.
                  </p>
                  <p>
                    <strong>7.2.3.</strong> Créditos remanescentes podem ser
                    usados em novas consultas ou complementados.
                  </p>
                  <p>
                    <strong>7.2.4.</strong> O CONTRATANTE pode solicitar
                    reembolso em até 7 dias, desde que os créditos não tenham
                    sido utilizados.
                  </p>
                  <p>
                    <strong>7.3.</strong> O CONTRATANTE é responsável pela
                    veracidade dos dados do veículo informados.
                  </p>
                  <p>
                    <strong>7.3.1.</strong> A CONTRATADA não se responsabiliza
                    por erros nas informações fornecidas.
                  </p>
                  <p>
                    <strong>7.4.</strong> Após o envio dos dados, as consultas
                    serão processadas e não poderão ser canceladas.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  8. Preços
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>8.1.</strong> Os valores dos serviços estão
                    disponíveis na plataforma.
                  </p>
                  <p>
                    <strong>8.2.</strong> O CONTRATANTE pode adquirir créditos
                    conforme o valor das consultas ou por meio de pacotes.
                  </p>
                  <p>
                    <strong>8.2.1.</strong> A conversão será feita com base no
                    preço vigente da consulta.
                  </p>
                  <p>
                    <strong>8.3.</strong> A CONTRATADA pode alterar os preços a
                    qualquer momento, sem aviso prévio.
                  </p>
                  <p>
                    <strong>8.4.</strong> Promoções poderão ser divulgadas no
                    site, e ao participar, o CONTRATANTE aceita suas regras.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  9. Responsabilidades
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>9.1.</strong> As consultas são para uso pessoal, com
                    foco em compra e venda de veículos.
                  </p>
                  <p>
                    <strong>9.1.1.</strong> É proibido comercializar ou repassar
                    informações obtidas, sob pena de responsabilidade por danos
                    a terceiros.
                  </p>
                  <p>
                    <strong>9.1.2.</strong> A CONTRATADA poderá suspender o
                    acesso em caso de uso indevido.
                  </p>
                  <p>
                    <strong>9.2.</strong> A CONTRATADA não controla os dados das
                    bases utilizadas, não sendo responsável por erros ou
                    desatualizações.
                  </p>
                  <p>
                    <strong>9.3.</strong> As análises e pareceres fornecidos
                    pelo consultor automotivo virtual Plaquinha, baseados em
                    inteligência artificial, são gerados a partir dos dados
                    informados pelo usuário (como a placa), de fontes públicas
                    disponíveis, de parceiros . Embora o sistema busque oferecer
                    interpretações úteis e acessíveis, não há garantia de
                    precisão, completude ou infalibilidade nas respostas
                    apresentadas. Recomendamos fortemente que o usuário leia o
                    relatório completo na íntegra e realize sua própria
                    avaliação crítica antes de tomar qualquer decisão de compra.
                    O Placa Verificada e a Prototyp3 não emitem qualquer
                    julgamento, opinião ou recomendação definitiva sobre o
                    veículo analisado, sendo a decisão final de responsabilidade
                    exclusiva do comprador.
                  </p>
                  <p>
                    <strong>9.4.</strong> O CONTRATANTE deve adquirir e utilizar
                    os créditos dentro do prazo estipulado.
                  </p>
                  <p>
                    <strong>9.5.</strong> A CONTRATADA não garante
                    disponibilidade contínua da plataforma, podendo haver falhas
                    técnicas ou de conexão. O CONTRATANTE reconhece que não há
                    direito a ressarcimento por tais falhas.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  10. Cancelamento
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>10.1.</strong> O CONTRATANTE pode excluir sua conta
                    a qualquer momento, perdendo acesso aos serviços
                    contratados.
                  </p>
                  <p>
                    <strong>10.1.1.</strong> Créditos remanescentes só serão
                    reembolsados conforme cláusula 7.2.4.
                  </p>
                  <p>
                    <strong>10.1.2.</strong> É possível cancelar apenas um
                    serviço, mantendo a conta ativa.
                  </p>
                  <p>
                    <strong>10.2.</strong> O cancelamento de créditos pode ser
                    feito em até 7 dias, desde que não utilizados.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  11. Disposições Gerais
                </h2>
                <div className="text-gray-800 space-y-3 ms-6">
                  <p>
                    <strong>11.1.</strong> A CONTRATADA pode alterar, suspender
                    ou encerrar funcionalidades da plataforma conforme
                    necessidade ou decisão legal.
                  </p>
                  <p>
                    <strong>11.2.</strong> Em caso de violação dos termos ou da
                    legislação, a CONTRATADA poderá aplicar sanções, incluindo
                    suspensão ou exclusão da conta.
                  </p>
                  <p>
                    <strong>11.3.</strong> O atendimento ao cliente está
                    disponível via WhatsApp (11 5555-5555), site{" "} 
                    <a
                      href="https://www.placaverificada.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      www.placaverificada.com.br
                    </a>{" "}
                    ou e-mail{" "}
                    <a
                      href="mailto:contato@placaverificada.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      contato@placaverificada.com.br
                    </a>
                    .
                  </p>
                  <p>
                    <strong>11.4.</strong> O CONTRATANTE é responsável pelos
                    dados pessoais fornecidos, que serão tratados conforme a
                    LGPD (Lei nº 13.709/2018).
                  </p>
                  <p>
                    <strong>11.5.</strong> A CONTRATADA detém os direitos de
                    propriedade intelectual sobre a plataforma e seus conteúdos.
                  </p>
                  <p>
                    <strong>11.5.1.</strong> Este contrato não transfere
                    direitos sobre marcas, softwares, patentes ou segredos
                    comerciais.
                  </p>
                  <p>
                    <strong>11.5.2.</strong> O CONTRATANTE autoriza o uso
                    gratuito de sua imagem e depoimentos relacionados à
                    plataforma.
                  </p>
                  <p>
                    <strong>11.6.</strong> Caso alguma cláusula seja considerada
                    inválida, as demais permanecerão em vigor.
                  </p>
                  <p>
                    <strong>11.7.</strong> A tolerância da CONTRATADA não
                    implica renúncia de direitos.
                  </p>
                  <p>
                    <strong>11.8.</strong> A CONTRATADA pode transferir seus
                    direitos em caso de cessão de tecnologia, sem necessidade de
                    autorização do CONTRATANTE.
                  </p>
                  <p>
                    <strong>11.9.</strong> Este contrato é regido pelas leis
                    brasileiras, incluindo o Marco Civil da Internet, LGPD,
                    Código de Defesa do Consumidor e Código Civil.
                  </p>
                  <p>
                    <strong>11.10.</strong> Fica eleito o foro da Comarca da
                    Capital do Estado de São Paulo para resolução de conflitos.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default TermsOfUse;
