import React, { useEffect } from "react";
import PublicLayout from "../../components/layout/PublicLayout";
import { useScrollToTop } from "../../utils/scrollUtils";

const PrivacyPolicy = () => {
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
                Política de Privacidade
              </h1>
              <p className="text-lg text-gray-600 mb-2">
                Prototyp3 Serviços de Informática LTDA
              </p>
              <p className="text-lg text-gray-600 mb-2">
                Plataforma: Placa Verificada
              </p>
              <p className="text-lg text-gray-600">
                Data de vigência: 24 de setembro de 2025
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  1. Compromisso com a Privacidade
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  <strong>A Prototyp3 Serviços de Informática LTDA</strong>{" "}
                  (“Prototyp3”) trata a privacidade com seriedade. Esta Política
                  de Privacidade (“Política”) descreve como coletamos,
                  utilizamos, compartilhamos e protegemos os dados pessoais
                  obtidos por meio da utilização dos nossos serviços e da
                  plataforma <strong>Placa Verificada</strong>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  2. Definições
                </h2>
                <ul className="list-disc list-inside text-gray-800 space-y-2 ms-6">
                  <li>
                    <strong>Usuário:</strong> Pessoa física maior de 18 anos ou
                    legalmente emancipada que acessa nosso site ou aplicativo.
                  </li>
                  <li>
                    <strong>Dados Pessoais:</strong> Informações que identificam
                    ou podem identificar uma pessoa natural, isoladamente ou em
                    conjunto com outras informações.
                  </li>
                  <li>
                    <strong>Titular:</strong> Indivíduo a quem os Dados Pessoais
                    se referem.
                  </li>
                  <li>
                    <strong>Tratamento:</strong> Toda operação realizada com
                    Dados Pessoais, como coleta, armazenamento, modificação,
                    consulta, uso, compartilhamento ou exclusão, seja por meios
                    automatizados ou não.
                  </li>
                  <li>
                    <strong>LGPD:</strong> Lei nº 13.709/2018 — Lei Geral de
                    Proteção de Dados Pessoais.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  3. Finalidades do Tratamento de Dados Pessoais
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  A coleta e o uso dos seus dados pessoais pela{" "}
                  <strong>Prototyp3</strong> variam conforme sua interação com
                  nossos serviços. Abaixo estão as principais finalidades:
                </p>
                <div className="overflow-x-auto ms-6">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Finalidade
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Dados Pessoais Coletados
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Cadastro e acesso à plataforma
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, data de nascimento, e-mail, celular, CEP, CPF,
                          IP e registros de acesso
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Realização de consultas (gratuitas ou pagas)
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail e dados do veículo (placa, restrições,
                          recall, chassi, tabela FIPE, cadastro estadual, preço,
                          ocorrências, ficha técnica, peças e valores, débitos,
                          multas, opinião do dono etc.)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Compras na plataforma
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, CPF, dados do cartão (número, nome,
                          validade, código de segurança) e/ou cupom de desconto
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Ações de marketing
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, celular, CEP, histórico de consumo,
                          dados de veículos consultados (multas, leilão,
                          sinistro, manutenção)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Enriquecimento da base de dados
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Dados de veículos como placa, chassi, RENAVAM, motor,
                          cor e demais características
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Contato e feedback
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, telefone e avaliação da consulta (nota
                          de 1 a 10)
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Melhorias e desenvolvimento da plataforma
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, celular, CEP, CPF, IP, registros de
                          acesso, comentários e feedback
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Seção “Opinião do Dono”
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, dados do carro (marca, modelo, placa,
                          quilometragem) e comentários sobre o veículo
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Programa “Indique e Ganhe”
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail e link de indicação
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Serviço de parcelamento de débitos
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Nome, e-mail, CPF e dados do veículo (placa, chassi,
                          RENAVAM, versão, ano modelo, multas)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  4. Cookies e Tags
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  Cookies são pequenos arquivos de texto que armazenam dados
                  pessoais e são enviados ao navegador do dispositivo enquanto o
                  Usuário navega em nosso site. Eles ajudam a lembrar
                  preferências, facilitar a navegação, personalizar conteúdo,
                  manter sessões ativas e coletar informações sobre o
                  comportamento online.
                </p>
                <p className="text-gray-800 mb-4 ms-6">
                  Nos aplicativos móveis, utilizamos tags, que funcionam de
                  forma semelhante aos cookies. Elas permitem identificar quais
                  funcionalidades são mais utilizadas, entender padrões de uso e
                  aprimorar a experiência do Usuário com sugestões
                  personalizadas e melhorias contínuas
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  5. Tempo de Retenção dos Dados Pessoais
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  Os dados pessoais são mantidos pelo período necessário para
                  atender às finalidades para as quais foram coletados. Em
                  determinadas circunstâncias, poderemos conservar essas
                  informações por um tempo adicional, como para cumprimento de
                  obrigações legais, regulatórias ou contratuais. Toda retenção
                  será respaldada por uma base legal, e o titular poderá
                  solicitar a exclusão de seus dados conforme descrito no item
                  9.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  6. Medidas de Segurança
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  A <strong>Prototyp3</strong> e seus parceiros adotam diversas
                  práticas de segurança para evitar danos decorrentes do
                  tratamento de dados pessoais. Entre essas medidas estão:
                  proteção física e digital dos sistemas, controle de acesso,
                  uso de softwares seguros, e políticas internas de conformidade
                  e governança de dados ao longo do ciclo de vida dos serviços
                  prestados.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  7. Compartilhamento de Dados Pessoais
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  A <strong>Prototyp3</strong> poderá compartilhar dados
                  pessoais com terceiros que respeitem nossos padrões de
                  segurança, nas seguintes situações:
                </p>
                <ul className="list-disc list-inside text-gray-600 font-semibold space-y-2 ms-6">
                  <li>Obrigação legal</li>
                  <li>Empresas do mesmo grupo econômico</li>
                  <li>Fornecedores e parceiros</li>
                  <li>Proteção de direitos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  8. Armazenamento e Transferência Internacional
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  Os dados pessoais são armazenados em servidores localizados no
                  Brasil e nos Estados Unidos. Toda transferência internacional
                  é realizada com parceiros que comprovam conformidade com as
                  leis de proteção de dados. Ao utilizar nossos serviços, o
                  usuário declara estar ciente dessa transferência.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  9. Direitos do Titular
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  A LGPD assegura ao titular diversos direitos sobre seus dados
                  pessoais. Abaixo, explicamos cada um deles e como exercê-los:
                </p>
                <div className="overflow-x-auto ms-6">
                  <table className="min-w-full border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Direito
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
                          Descrição
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Informações sobre uso
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Solicitar confirmação de uso, acesso aos dados,
                          detalhes sobre compartilhamento e cópias dos
                          registros.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Correção
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Requisitar ajustes em dados incompletos, incorretos ou
                          desatualizados. Alterações também podem ser feitas em
                          “Perfil” &gt; “Meu Perfil”
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Anonimização, bloqueio ou exclusã
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Solicitar anonimização, bloqueio temporário ou
                          exclusão definitiva dos dados. A conta pode ser
                          excluída em “Perfil” &gt; “Sempre Conectado” &gt;
                          “Excluir Conta”.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Portabilidade
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Solicitar os dados em formato estruturado para
                          transferência a terceiros.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Informação sobre consentimento
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Receber explicações claras sobre a necessidade e
                          consequências de não fornecer consentimento.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Revogação do consentimento
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Retirar o consentimento previamente dado. A revogação
                          pode limitar o acesso a certos serviços.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Oposição
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Contestar o tratamento de dados realizado com base em
                          interesse legítimo.
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          Revisão de decisões automatizadas
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          Solicitar revisão de decisões tomadas exclusivamente
                          por sistemas automatizados.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-800 mt-4 ms-6">
                  Para garantir a segurança, poderemos solicitar informações
                  adicionais para confirmar a identidade do solicitante. Em
                  alguns casos, não poderemos atender à solicitação, como quando
                  há obrigação legal de manter os dados ou risco de violação de
                  segredos comerciais.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  10. Contato
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  Para exercer seus direitos ou esclarecer dúvidas sobre esta
                  Política, entre em contato com nossa encarregada de dados:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg ms-6">
                  <p className="text-gray-800 font-semibold">Alexandre Souza</p>
                  <p className="text-gray-800">
                    E-mail:{" "}
                    <a
                      href="mailto:dpo@placaverificada.com.br"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      dpo@placaverificada.com.br
                    </a>
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-[1.4rem] font-semibold text-gray-900 mb-4">
                  11. Atualizações da Política
                </h2>
                <p className="text-gray-800 mb-4 ms-6">
                  Buscando sempre aprimorar nossos serviços, esta Política
                  poderá ser atualizada periodicamente.
                </p>
                <p className="text-gray-800 mb-4 ms-6">
                  Recomendamos que você consulte esta página regularmente para
                  acompanhar eventuais alterações.
                </p>
              </section>
            </div>
            <p className="text-gray-800 font-medium text-center text-xs">
              Este documento é válido a partir de 24 de Setembro de 2025.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PrivacyPolicy;
