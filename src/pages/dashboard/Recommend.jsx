import React, { useState, useEffect } from "react";
import MainContent from "../../components/layout/MainContent";
import { toast } from "react-toastify";
import { getMyCoupons } from "../../services/authService";

const RecommendPage = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const data = await getMyCoupons();
      setCoupons(data.coupons || []);
    } catch (error) {
      console.error("Failed to load coupons:", error);
      toast.error("Erro ao carregar cupons. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCoupon = (coupon) => {
    navigator.clipboard.writeText(coupon);
    toast.success("Cupom copiado para a área de transferência!");
  };

  return (
    <MainContent showMenu={false}>
      <p className="text-2xl font-semibold mb-4">Minhas indicações</p>
      <p className="text-[1.2rem] mb-4 font-medium max-w-[650px]">
        Indique o placa verificada para seus amigos e clientes e ganhe um cupom
        de desconto por indicação. Você pode usar o valor em consultas futuras.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#194D9A]"></div>
        </div>
      ) : coupons.length > 0 ? (
        <div className="space-y-4">
          <p className="text-[#194D9A] text-[1.2rem] font-medium mb-2">
            Meus Cupons de Desconto
          </p>
          {coupons.map((coupon, index) => (
            <div key={index} className="flex items-center gap-2">
              <p className="text-[1rem] px-6 py-1.5 border-2 border-[#194D9A] rounded-full">
                {coupon}
              </p>
              <button
                onClick={() => handleCopyCoupon(coupon)}
                className="bg-[#194D9A] text-white px-6 py-2 rounded-full cursor-pointer hover:bg-[#153d7a] transition-colors"
              >
                Copiar cupom
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 py-4">
          <p>Você ainda não possui cupons de desconto.</p>
          <p className="text-sm mt-2">
            Indique o Placa Verificada para seus amigos e ganhe cupons!
          </p>
        </div>
      )}
    </MainContent>
  );
};

export default RecommendPage;
