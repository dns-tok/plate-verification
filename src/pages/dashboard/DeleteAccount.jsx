import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MainContent from "../../components/layout/MainContent";
import InputField from "../../components/common/Form/InputField";
import { useAuth } from "../../hooks/useAuth";
import { deleteAccount } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const deleteAccountSchema = z.object({
  password: z.string().nonempty("Password is required"),
});

const DeleteAccountPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const form = useForm({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleDelete = async (data) => {
    if (!showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsDeleting(true);
    try {
      const response = await deleteAccount(data.password);

      // Check if deletion was successful
      if (response) {
        toast.success(response?.message || "Account deletion initiated successfully!");
        // Logout and redirect after a short delay
        setTimeout(() => {
          logout();
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Failed to delete account:", error);

      // Extract error message
      const errorMessage =
        error?.response?.data?.detail ||
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Falha ao deletar conta. Por favor, verifique sua senha e tente novamente.";

      toast.error(errorMessage);
      // Reset confirmation on error so user can try again
      setShowConfirmation(false);
      form.reset();
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    form.reset();
  };

  return (
    <MainContent showMenu={false}>
      <p className="text-2xl font-semibold mb-4">Deletar sua conta</p>
      <div>
        <p className="text-red-600 text-[0.85rem] font-medium mb-2">
          Preste muita atenção nesta etapa!!!
        </p>
        <ul className="list-decimal list-inside text-[0.65rem] font-[400] space-y-2">
          <li>
            Se não houver registro de compras, consultas ou pagamentos, a
            exclusão será concluída em até 30 dias.
          </li>
          <li>
            Se houver alguma atividade registrada, sua conta será desativada por
            até 3 anos e poderá ser reativada a qualquer momento através da
            opção "Esqueci minha senha".
          </li>
          <li>
            Após esse período, a exclusão será definitiva e irreversível. Todas
            as informações vinculadas à conta — como histórico, créditos,
            consultas e preferências — serão excluídas e o acesso aos nossos
            serviços será encerrado.
          </li>
        </ul>
      </div>

      <form
        onSubmit={form.handleSubmit(handleDelete)}
        className="mt-4 space-y-2"
      >
        <p className="text-[0.7rem] font-[600]">
          Se você tem certeza de que deseja continuar, insira sua senha e clique
          em "Deletar conta" <span className="text-red-500">*</span>
        </p>

        {showConfirmation && (
          <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-3">
            <p className="text-red-700 text-[0.7rem] font-semibold">
              ⚠️ AVISO: Esta ação não pode ser desfeita. Tem certeza absoluta de
              que deseja excluir sua conta?
            </p>
          </div>
        )}

        <div className="flex flex-col gap-1 w-[70%]">
          <InputField
            form={form}
            label="Senha atual"
            name="password"
            required
            isPassword={true}
            placeholder="Digite sua senha"
            labelClassName="!text-black !text-sm"
            inputClassName="!bg-[#EDEDED] !p-2 !py-3 !rounded-md !text-black !text-sm"
            inputContainerClassName="!bg-[#EDEDED] !p-0 !rounded-md !text-black !text-sm"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className={`w-fit bg-red-500 hover:bg-red-700 text-white rounded-md px-3 py-1.5 text-[0.8rem] font-[400] outline-none cursor-pointer transition-all duration-200 ${
                isDeleting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Deletar conta"}
            </button>

            {showConfirmation && (
              <button
                type="button"
                onClick={handleCancel}
                className="w-fit bg-gray-500 hover:bg-gray-700 text-white rounded-md px-3 py-1.5 text-[0.8rem] font-[400] outline-none cursor-pointer transition-all duration-200"
                disabled={isDeleting}
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </form>
    </MainContent>
  );
};

export default DeleteAccountPage;
