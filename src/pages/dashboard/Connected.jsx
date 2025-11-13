import React, { useState, useEffect } from "react";
import MainContent from "../../components/layout/MainContent";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { updateProfile } from "../../services/authService";
import { toast } from "react-toastify";

const ConnectedPage = () => {
  const { user, refreshUserProfile } = useAuth();
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const bothEnabled =
        (user.contact_whatsapp || false) && (user.contact_email || false);
      setIsEnabled(bothEnabled);
    }
  }, [user]);

  const handleToggle = async () => {
    if (loading) return;

    setLoading(true);
    const newValue = !isEnabled;

    try {
      const updateData = {
        contact_whatsapp: newValue,
        contact_email: newValue,
      };

      const response = await updateProfile(updateData);
      setIsEnabled(newValue);

      // Refresh user profile to get updated data
      await refreshUserProfile();

      toast.success(response?.message || "Preferências atualizadas com sucesso!");
    } catch (error) {
      console.error("Failed to update contact preferences:", error);
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.error ||
                          "Erro ao atualizar preferências. Tente novamente.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainContent showMenu={false} bgImage="/assets/privacy.svg">
      <p className="text-2xl font-semibold mb-4">Privacidade</p>
      <div
        onClick={handleToggle}
        className={`${
          isEnabled ? "bg-[#34C759]" : "bg-gray-400"
        } p-2 rounded-lg flex items-center gap-4 justify-between w-fit cursor-pointer transition-colors duration-300 hover:opacity-90`}
      >
        <div className="bg-white py-2 px-4 rounded-md">
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Método de contato:</span>{" "}
            WhatsApp e E-mail
          </p>
          <p className="text-[0.8rem] font-[400]">
            <span className="font-[600] text-[0.7rem]">Objetivo: </span>
            Comunicação direta
            <br /> com o cliente
          </p>
        </div>
        {loading ? (
          <FaSpinner className="text-white text-[2.8rem] animate-spin" />
        ) : isEnabled ? (
          <FaCheckCircle className="text-white text-[2.8rem] " />
        ) : (
          <FaTimesCircle className="text-white text-[2.8rem] " />
        )}
      </div>
      <p className="text-[0.8rem] font-[400] max-w-[95%] mt-5">
        Ao utilizar nossa plataforma, você autoriza o uso de seus dados para
        fins de comunicação via e-mail e WhatsApp. Podemos enviar conteúdo como
        notícias, promoções, atualizações e informações relevantes sobre nossos
        serviços. O processamento de dados está em total conformidade com a Lei
        Geral de Proteção de Dados (LGPD), com segurança e transparência. Você
        pode gerenciar suas preferências a qualquer momento. Para mais detalhes,
        consulte nossa Política de{" "}
        <span className="text-[#194D9A] cursor-pointer hover:underline">
          <Link to="/privacy-policy">Privacidade</Link>
        </span>
        .
      </p>
    </MainContent>
  );
};

export default ConnectedPage;
