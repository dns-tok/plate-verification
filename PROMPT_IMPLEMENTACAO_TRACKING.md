# PROMPT PARA IMPLEMENTAÇÃO DE TRACKING COMPLETO

## CONTEXTO
Preciso implementar um sistema completo de rastreamento e analytics em um site Next.js que inclui Google Analytics, Meta Pixel (Facebook/Instagram) e webhook personalizado para coleta de dados dos visitantes.

## IMPLEMENTAÇÕES NECESSÁRIAS

### 1. GOOGLE ANALYTICS (ID: G-66MMS8YJBV)

**No arquivo `pages/_document.tsx`:**
Adicionar no `<Head>`:
```tsx
{/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-66MMS8YJBV"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-66MMS8YJBV');
    `,
  }}
/>
```

### 2. META PIXEL (ID: 850946120606383)

**No arquivo `pages/_document.tsx`:**
Adicionar no `<Head>` após o Google Analytics:
```tsx
{/* Meta Pixel */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '850946120606383');
      fbq('track', 'PageView');
    `,
  }}
/>
<noscript>
  <img 
    height="1" 
    width="1" 
    style={{display: 'none'}} 
    src="https://www.facebook.com/tr?id=850946120606383&ev=PageView&noscript=1" 
  />
</noscript>
```

### 3. WEBHOOK DE VISITANTES

**No arquivo `pages/_app.tsx`:**
Adicionar no useEffect após a inicialização:
```tsx
import { useEffect } from 'react';

// Dentro do componente _app:
useEffect(() => {
  // Meta Pixel - ViewContent event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_name: 'Página Principal',
      content_category: 'Website'
    });
  }

  // Função para enviar dados do visitante
  const sendVisitorInfo = () => {
    try {
      const visitorData = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        cookieEnabled: navigator.cookieEnabled,
        screenResolution: `${screen.width}x${screen.height}`,
        viewport: `${window.innerWidth}x${window.innerHeight}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        online: navigator.onLine,
        connection: (navigator as any).connection ? {
          effectiveType: (navigator as any).connection.effectiveType,
          downlink: (navigator as any).connection.downlink,
          rtt: (navigator as any).connection.rtt
        } : null,
        sessionId: sessionStorage.getItem('sessionId') || 
          (() => {
            const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
            sessionStorage.setItem('sessionId', id);
            return id;
          })(),
        pageLoadTime: performance.timing?.loadEventEnd - performance.timing?.navigationStart || 0,
        source: 'placaverificada'
      };

      // Usar sendBeacon para evitar CORS
      const data = JSON.stringify(visitorData);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          'https://primary-production-5b6d1.up.railway.app/webhook',
          data
        );
      }
    } catch (error) {
      console.log('Erro ao enviar dados do visitante:', error);
    }
  };

  // Executar após 2 segundos para não impactar performance
  const timer = setTimeout(sendVisitorInfo, 2000);
  return () => clearTimeout(timer);
}, []);
```

### 4. EVENTOS META PIXEL EM COMPONENTES

**Para formulários de busca/pesquisa:**
```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Meta Pixel - Search event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Search', {
      search_string: inputValue,
      content_category: 'Consulta Placa'
    });
  }

  // Lógica do formulário...
  
  // Se sucesso, disparar Lead event
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: 'Consulta de Placa',
      content_category: 'Formulario',
      value: inputValue
    });
  }
};
```

**Para botões de planos/preços:**
```tsx
<button
  onClick={() => {
    // Meta Pixel - InitiateCheckout event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_name: plan.name,
        content_category: 'Plano',
        value: parseFloat(plan.price.replace(',', '.')),
        currency: 'BRL'
      });
    }
  }}
>
  Escolher Plano
</button>
```

**Para botões de contato:**
```tsx
<button
  onClick={() => {
    // Meta Pixel - Contact event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp - FAQ',
        content_category: 'Contato',
        method: 'whatsapp'
      });
    }
  }}
>
  Falar no WhatsApp
</button>
```

**Para botões de login/cadastro:**
```tsx
<button
  onClick={() => {
    // Meta Pixel - Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead', {
        content_name: 'Botão Entrar',
        content_category: 'Login'
      });
    }
  }}
>
  Entrar
</button>
```

## INSTRUÇÕES DE IMPLEMENTAÇÃO

1. **Implementar Google Analytics** no `_document.tsx`
2. **Implementar Meta Pixel** no `_document.tsx` 
3. **Implementar webhook de visitantes** no `_app.tsx`
4. **Adicionar eventos Meta Pixel** em TODOS os botões e formulários interativos do site:
   - Formulários de busca/pesquisa (Search + Lead)
   - Botões de planos (InitiateCheckout)
   - Botões de contato (Contact)
   - Botões de login/cadastro (Lead)
   - Links importantes (Custom events)

5. **Verificar se há outros componentes** como FAQ, Header, Footer, Hero, Planos, etc. que precisam dos eventos

6. **Testar a implementação** fazendo build e verificando se não há erros

## RESULTADO ESPERADO

- Google Analytics coletando pageviews automaticamente
- Meta Pixel coletando PageView, ViewContent, Search, Lead, InitiateCheckout, Contact
- Webhook enviando dados detalhados dos visitantes para análise
- Todos os eventos disparando corretamente sem afetar a performance do site

## OBSERVAÇÕES IMPORTANTES

- Usar `typeof window !== 'undefined'` para verificação client-side
- Usar `navigator.sendBeacon` para o webhook evitar problemas de CORS
- Não bloquear a interface com os eventos de tracking
- Incluir dados relevantes nos eventos (valores, nomes, categorias)
- Testar todos os eventos após implementação