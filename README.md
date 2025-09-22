# Trackdesk - Guia Completo de Utilização

## 📋 Índice
- [Introdução](#introdução)
- [Criação de Ofertas](#criação-de-ofertas)
- [Configuração de Afiliados](#configuração-de-afiliados)
- [Scripts de Tracking](#scripts-de-tracking)
  - [Script de Clique](#script-de-clique)
  - [Script de Conversão](#script-de-conversão)
  - [Configuração via Postback](#configuração-via-postback-urls)
- [Tipos de Conversão](#tipos-de-conversão)
- [Exemplos Práticos](#exemplos-práticos)
- [Melhores Práticas](#melhores-práticas)
- [Troubleshooting](#troubleshooting)

## 🚀 Introdução

O Trackdesk é uma plataforma robusta de tracking e gerenciamento de afiliados que permite monitorar cliques, conversões e performance de campanhas de marketing de afiliados. Esta documentação fornece um guia completo para utilizar todas as funcionalidades da plataforma.

### Principais Funcionalidades:
- ✅ Criação e gerenciamento de ofertas
- ✅ Sistema de afiliados integrado
- ✅ Tracking de cliques em tempo real
- ✅ Monitoramento de conversões
- ✅ Relatórios detalhados de performance
- ✅ API para integração personalizada

## 📝 Criação de Ofertas

### Passo 1: Acessar o Painel de Ofertas
1. Faça login na sua conta Trackdesk
2. Navegue até **"Ofertas"** no menu principal
3. Clique em **"Nova Oferta"**

### Passo 2: Configurar Informações Básicas
```
Nome da Oferta: [Nome descritivo da sua oferta]
Descrição: [Descrição detalhada do produto/serviço]
Categoria: [Selecione a categoria apropriada]
Status: [Ativo/Inativo]
```

### Passo 3: Definir Parâmetros de Comissão
- **Tipo de Comissão**: CPA, CPL, CPS, Revenue Share
- **Valor da Comissão**: Defina o valor ou percentual
- **Moeda**: Selecione a moeda (BRL, USD, EUR, etc.)
- **Cap Diário/Mensal**: Limite de conversões (opcional)

### Passo 4: Configurar URLs
- **URL de Destino**: Para onde o tráfego será direcionado
- **URL de Tracking**: URL personalizada para tracking
- **Pixel de Conversão**: Configure o pixel de tracking

### Passo 5: Definir Restrições (Opcional)
- **Países Permitidos**: Liste os países aceitos
- **Tipos de Tráfego**: Orgânico, Pago, Social, etc.
- **Dispositivos**: Desktop, Mobile, Tablet

## 👥 Configuração de Afiliados

### Atribuindo uma Oferta a um Afiliado

#### Método 1: Através do Painel de Afiliados
1. Acesse **"Afiliados"** no menu principal
2. Selecione o afiliado desejado
3. Clique em **"Ofertas Disponíveis"**
4. Encontre a oferta e clique em **"Atribuir"**
5. Configure os parâmetros específicos:
   - Comissão personalizada (se aplicável)
   - Limite de conversões
   - Data de início/fim da campanha

#### Método 2: Através do Painel de Ofertas
1. Acesse **"Ofertas"** no menu principal
2. Selecione a oferta desejada
3. Clique na aba **"Afiliados"**
4. Clique em **"Adicionar Afiliado"**
5. Selecione o(s) afiliado(s) da lista
6. Configure os parâmetros específicos

### Gerando Links de Afiliado
Após atribuir a oferta ao afiliado:
1. O afiliado receberá um **link único de tracking**
2. Este link será no formato: `https://track.trackdesk.com/[OFFER_ID]/[AFFILIATE_ID]`
3. O afiliado deve usar este link em suas campanhas

## 🔧 Scripts de Tracking

O Trackdesk oferece duas formas principais de tracking: **Scripts JavaScript** (client-side) e **Postback URLs** (server-to-server). Escolha o método mais adequado para sua implementação.

### Script de Clique

Este script deve ser implementado na **página de destino** para rastrear quando um usuário clica no link do afiliado.

#### Opção 1: Script Inline (Básico)

```html
<!-- Trackdesk tracker begin -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");

  trackdesk("affiliates-br", "click");
</script>
<!-- Trackdesk tracker end -->
```

#### Opção 2: Arquivo JavaScript Separado (Recomendado)

1. **Baixe o arquivo**: <mcfile name="trackdesk-click.js" path="/Users/mateusroberto/Documents/GitHub/elon-watches-emporium/trackdesk-help/trackdesk-click.js"></mcfile>
2. **Configure**: Edite o arquivo e substitua `'affiliates-br'` pelo ID da sua campanha
3. **Implemente**: Adicione o script na sua página

```html
<!-- Trackdesk Click Tracking -->
<script src="./trackdesk-click.js"></script>
```

**Vantagens do arquivo separado:**
- ✅ **Configuração centralizada** - Fácil de manter
- ✅ **Debug integrado** - Logs detalhados para desenvolvimento
- ✅ **Tratamento de erros** - Maior robustez
- ✅ **Cache do navegador** - Melhor performance
- ✅ **API pública** - Permite tracking manual

#### Como Implementar:
1. **Posicionamento**: Coloque o script no `<head>` ou antes do fechamento do `<body>`
2. **Parâmetros**: 
   - `"affiliates-br"`: Substitua pelo ID da sua campanha/programa
   - `"click"`: Indica que é um evento de clique
3. **Carregamento**: O script é assíncrono, não afeta a velocidade da página

### Script de Conversão

Este script deve ser implementado na **página de confirmação/obrigado** para rastrear conversões.

#### Opção 1: Script Inline (Básico)

```html
<!-- Trackdesk tracker begin -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");

  trackdesk("affiliates-br", "conversion", {
    "conversionType": "ftd"
  });
</script>
<!-- Trackdesk tracker end -->
```

#### Opção 2: Arquivo JavaScript Separado (Recomendado)

1. **Baixe o arquivo**: <mcfile name="trackdesk-conversion.js" path="/Users/mateusroberto/Documents/GitHub/elon-watches-emporium/trackdesk-help/trackdesk-conversion.js"></mcfile>
2. **Configure**: Edite o arquivo e ajuste as configurações conforme necessário
3. **Implemente**: Adicione o script na sua página de confirmação

```html
<!-- Trackdesk Conversion Tracking -->
<script src="./trackdesk-conversion.js"></script>
```

**Vantagens do arquivo separado:**
- ✅ **Auto-detecção de dados** - Extrai dados da URL e elementos HTML
- ✅ **Múltiplos tipos de conversão** - Suporte completo a todos os tipos
- ✅ **API rica** - Métodos específicos para cada tipo de conversão
- ✅ **Validação integrada** - Verifica tipos de conversão válidos
- ✅ **Configuração flexível** - Fácil personalização

#### Uso Manual da API (Arquivo Separado)

```javascript
// Tracking manual de venda
TrackdeskConversion.trackSale(99.90, 'BRL', 'ORDER123');

// Tracking manual de FTD
TrackdeskConversion.trackFTD(50.00, 'BRL', 'TXN456');

// Tracking manual de lead
TrackdeskConversion.trackLead({ source: 'facebook' });

// Tracking manual de trial
TrackdeskConversion.trackTrial('premium', { duration: '30days' });

// Tracking personalizado
TrackdeskConversion.track({
    conversionType: 'sale',
    value: 149.90,
    currency: 'BRL',
    orderId: 'ORD789',
    custom: { category: 'electronics' }
});
```

#### Auto-detecção de Dados

O arquivo JavaScript separado pode extrair dados automaticamente de:

**1. Parâmetros da URL:**
```
https://obrigado.com?value=99.90&currency=BRL&order_id=123&conversion_type=sale
```

**2. Elementos HTML com data attributes:**
```html
<div data-conversion-value="99.90"></div>
<div data-conversion-currency="BRL"></div>
<div data-order-id="ORDER123"></div>
<div data-transaction-id="TXN456"></div>
<div data-conversion-type="sale"></div>
```

#### Parâmetros do Script de Conversão:
- `"affiliates-br"`: ID da sua campanha/programa
- `"conversion"`: Indica que é um evento de conversão
- `"conversionType"`: **IMPORTANTE** - Defina o tipo de conversão apropriado

### Configuração via Postback URLs

O **Postback** é um método server-to-server que oferece maior confiabilidade e segurança para tracking de conversões. É especialmente recomendado para transações financeiras e conversões de alto valor.

#### Vantagens do Postback:
- ✅ **Maior confiabilidade** - Não depende do JavaScript do navegador
- ✅ **Segurança aprimorada** - Comunicação direta entre servidores
- ✅ **Não afetado por bloqueadores** - Bypassa ad-blockers
- ✅ **Dados mais precisos** - Elimina problemas de cache/cookies

#### Como Configurar Postback:

##### 1. Configuração no Painel Trackdesk
1. Acesse **"Ofertas"** → Selecione sua oferta
2. Vá para a aba **"Postback"**
3. Configure a **Postback URL** que o Trackdesk irá chamar:

```
URL de Postback: https://affiliates-br.trackdesk.com/trackdesk-postback
Método: GET ou POST
```

##### 2. Parâmetros Disponíveis
O Trackdesk enviará os seguintes parâmetros na chamada de postback:

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `click_id` | ID único do clique | `abc123def456` |
| `affiliate_id` | ID do afiliado | `1001` |
| `offer_id` | ID da oferta | `500` |
| `conversion_type` | Tipo de conversão | `ftd`, `sale`, `lead` |
| `payout` | Valor da comissão | `25.50` |
| `revenue` | Valor da receita | `100.00` |
| `currency` | Moeda | `BRL`, `USD` |
| `transaction_id` | ID da transação | `TXN789` |
| `status` | Status da conversão | `approved`, `pending` |

##### 3. URL de Postback Exemplo
```
https://affiliates-br.trackdesk.com/trackdesk-postback?click_id={click_id}&affiliate_id={affiliate_id}&offer_id={offer_id}&conversion_type={conversion_type}&payout={payout}&revenue={revenue}&currency={currency}&transaction_id={transaction_id}&status={status}
```

##### 4. Implementação no Seu Servidor

**Exemplo em PHP:**
```php
<?php
// Receber dados do postback
$click_id = $_GET['click_id'];
$affiliate_id = $_GET['affiliate_id'];
$offer_id = $_GET['offer_id'];
$conversion_type = $_GET['conversion_type'];
$payout = $_GET['payout'];
$revenue = $_GET['revenue'];
$currency = $_GET['currency'];
$transaction_id = $_GET['transaction_id'];
$status = $_GET['status'];

// Validar e processar a conversão
if ($click_id && $affiliate_id && $offer_id) {
    // Salvar no banco de dados
    $sql = "INSERT INTO conversions (click_id, affiliate_id, offer_id, conversion_type, payout, revenue, currency, transaction_id, status, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())";
    
    // Executar query...
    
    // Responder com sucesso
    http_response_code(200);
    echo "OK";
} else {
    // Responder com erro
    http_response_code(400);
    echo "Invalid parameters";
}
?>
```

**Exemplo em Node.js:**
```javascript
const express = require('express');
const app = express();

app.get('/trackdesk-postback', (req, res) => {
    const {
        click_id,
        affiliate_id,
        offer_id,
        conversion_type,
        payout,
        revenue,
        currency,
        transaction_id,
        status
    } = req.query;

    // Validar parâmetros
    if (!click_id || !affiliate_id || !offer_id) {
        return res.status(400).send('Invalid parameters');
    }

    // Processar conversão
    processConversion({
        click_id,
        affiliate_id,
        offer_id,
        conversion_type,
        payout: parseFloat(payout),
        revenue: parseFloat(revenue),
        currency,
        transaction_id,
        status
    });

    // Responder com sucesso
    res.status(200).send('OK');
});

function processConversion(data) {
    // Salvar no banco de dados
    // Enviar notificações
    // Atualizar relatórios
    console.log('Conversão processada:', data);
}
```

**Exemplo em Python (Flask):**
```python
from flask import Flask, request
import sqlite3
from datetime import datetime

app = Flask(__name__)

@app.route('/trackdesk-postback', methods=['GET'])
def trackdesk_postback():
    # Receber parâmetros
    click_id = request.args.get('click_id')
    affiliate_id = request.args.get('affiliate_id')
    offer_id = request.args.get('offer_id')
    conversion_type = request.args.get('conversion_type')
    payout = request.args.get('payout')
    revenue = request.args.get('revenue')
    currency = request.args.get('currency')
    transaction_id = request.args.get('transaction_id')
    status = request.args.get('status')
    
    # Validar parâmetros obrigatórios
    if not all([click_id, affiliate_id, offer_id]):
        return 'Invalid parameters', 400
    
    # Processar conversão
    try:
        save_conversion({
            'click_id': click_id,
            'affiliate_id': affiliate_id,
            'offer_id': offer_id,
            'conversion_type': conversion_type,
            'payout': float(payout) if payout else 0,
            'revenue': float(revenue) if revenue else 0,
            'currency': currency,
            'transaction_id': transaction_id,
            'status': status,
            'created_at': datetime.now()
        })
        return 'OK', 200
    except Exception as e:
        return f'Error: {str(e)}', 500

def save_conversion(data):
    # Implementar salvamento no banco de dados
    pass
```

##### 5. Testando o Postback
1. **Teste Manual**: Use ferramentas como Postman ou curl para simular chamadas
2. **Logs**: Implemente logs detalhados para debug
3. **Validação**: Sempre valide os dados recebidos
4. **Resposta**: Sempre responda com status HTTP 200 para confirmação

```bash
 # Teste com curl
 curl "https://affiliates-br.trackdesk.com/trackdesk-postback?click_id=test123&affiliate_id=1001&offer_id=500&conversion_type=sale&payout=25.50&revenue=100.00&currency=BRL&transaction_id=TXN789&status=approved"
 ```

#### Configuração Híbrida (Recomendada)
Para máxima confiabilidade, use **ambos os métodos**:
1. **JavaScript** para tracking imediato e UX
2. **Postback** para confirmação server-to-server

```javascript
// Script JavaScript (tracking imediato)
trackdesk("affiliates-br", "conversion", {
    "conversionType": "sale",
    "value": 99.90,
    "transactionId": "TXN789"
});

// + Postback configurado no servidor para confirmação
```

## 📊 Tipos de Conversão

O parâmetro `conversionType` deve ser configurado de acordo com o tipo de ação que você deseja rastrear:

### Tipos Disponíveis:

| Tipo | Código | Descrição |
|------|--------|-----------|
| **First Time Deposit** | `"ftd"` | Primeiro depósito do usuário |
| **Lead** | `"lead"` | Cadastro/Lead qualificado |
| **Sale** | `"sale"` | Venda/Compra realizada |
| **Registration** | `"registration"` | Cadastro/Registro de usuário |
| **Download** | `"download"` | Download de arquivo/app |
| **Trial** | `"trial"` | Início de período de teste |
| **Subscription** | `"subscription"` | Assinatura de serviço |
| **Custom** | `"custom"` | Evento personalizado |

### Exemplo com Diferentes Tipos:

```javascript
// Para um e-commerce (venda)
trackdesk("affiliates-br", "conversion", {
  "conversionType": "sale",
  "value": 99.90,
  "currency": "BRL",
  "orderId": "ORDER123"
});

// Para um SaaS (trial)
trackdesk("affiliates-br", "conversion", {
  "conversionType": "trial",
  "planType": "premium"
});

// Para um casino (primeiro depósito)
trackdesk("affiliates-br", "conversion", {
  "conversionType": "ftd",
  "value": 50.00,
  "currency": "BRL"
});
```

## 💡 Exemplos Práticos

### Exemplo 1: E-commerce (com arquivos separados)
```html
<!-- Página do produto (tracking de clique) -->
<script src="./trackdesk-click.js"></script>

<!-- Página de confirmação de compra (tracking de conversão) -->
<script src="./trackdesk-conversion.js"></script>

<!-- Ou tracking manual específico -->
<script>
// Aguardar carregamento do script
document.addEventListener('DOMContentLoaded', function() {
    TrackdeskConversion.trackSale(149.90, 'BRL', 'ORD789');
});
</script>
```

### Exemplo 4: Aplicativo SaaS (scripts inline - método original)
```html
<!-- Landing page (tracking de clique) -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
  trackdesk("saas-app", "click");
</script>

<!-- Página de confirmação de trial (tracking de conversão) -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
  trackdesk("saas-app", "conversion", {
    "conversionType": "trial",
    "planType": "professional"
  });
</script>
```

### Exemplo 5: Implementação com Postback
```html
<!-- Landing page (tracking de clique) -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
  trackdesk("casino-br", "click");
</script>

<!-- Página de confirmação (tracking JavaScript + Postback server-side) -->
<script async src="//cdn.trackdesk.com/tracking.js"></script>
<script>
  (function(t,d,k){(t[k]=t[k]||[]).push(d);t[d]=t[d]||t[k].f||function(){(t[d].q=t[d].q||[]).push(arguments)}})(window,"trackdesk","TrackdeskObject");
  trackdesk("casino-br", "conversion", {
    "conversionType": "ftd",
    "value": 100.00,
    "currency": "BRL",
    "transactionId": "TXN456"
  });
</script>

<!-- No servidor, configure o postback para confirmação -->
```

**Configuração do Postback no servidor:**
```php
// Endpoint: /trackdesk-postback
if ($_GET['transaction_id'] === 'TXN456' && $_GET['status'] === 'approved') {
    // Confirmar conversão no banco de dados
    updateConversionStatus($_GET['transaction_id'], 'confirmed');
    echo "OK";
}
```

## ⚡ Melhores Práticas

### 1. Implementação dos Scripts
- ✅ **Sempre teste** os scripts em ambiente de desenvolvimento primeiro
- ✅ **Use HTTPS** para garantir segurança
- ✅ **Implemente o script de clique** na página de destino
- ✅ **Implemente o script de conversão** apenas na página de confirmação
- ✅ **Verifique se os IDs** da campanha estão corretos

### 2. Configuração de Postback
- ✅ **Use Postback para conversões críticas** (transações financeiras)
- ✅ **Implemente validação robusta** nos endpoints
- ✅ **Configure logs detalhados** para debug
- ✅ **Responda sempre com HTTP 200** para confirmação
- ✅ **Use HTTPS** para URLs de postback
- ✅ **Implemente retry logic** para falhas temporárias

### 3. Monitoramento
- 📊 **Monitore regularmente** os relatórios de performance
- 📊 **Configure alertas** para conversões importantes
- 📊 **Analise os dados** de cliques vs conversões
- 📊 **Otimize campanhas** com base nos dados

### 4. Segurança
- 🔒 **Proteja seus links** de tracking contra fraudes
- 🔒 **Use validação** de conversões quando necessário
- 🔒 **Monitore tráfego suspeito** regularmente
- 🔒 **Configure limites** de conversões por IP/dispositivo

### 5. Performance
- ⚡ **Scripts assíncronos** não afetam o carregamento da página
- ⚡ **CDN global** garante velocidade de carregamento
- ⚡ **Cache otimizado** para melhor performance
- ⚡ **Minimize chamadas** desnecessárias de tracking

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Cliques não estão sendo registrados
**Possíveis causas:**
- Script não implementado corretamente
- ID da campanha incorreto
- Bloqueadores de anúncios
- Problemas de CORS

**Soluções:**
```javascript
// Verifique se o script está carregando
console.log(typeof trackdesk); // Deve retornar 'function'

// Teste manual do tracking
trackdesk("sua-campanha", "click");
```

#### 2. Conversões não estão sendo registradas
**Possíveis causas:**
- Script de conversão não implementado
- Tipo de conversão incorreto
- Página de confirmação não acessível

**Soluções:**
```javascript
// Debug do script de conversão
trackdesk("sua-campanha", "conversion", {
  "conversionType": "sale", // Verifique se o tipo está correto
  "debug": true // Adicione para debug
});
```

#### 3. Postback não está funcionando
**Possíveis causas:**
- URL de postback incorreta ou inacessível
- Servidor não responde com HTTP 200
- Firewall bloqueando requisições do Trackdesk
- Timeout na resposta do servidor

**Soluções:**
 ```bash
 # Teste a URL de postback manualmente
 curl -I "https://affiliates-br.trackdesk.com/trackdesk-postback"
 
 # Verifique logs do servidor
 tail -f /var/log/nginx/access.log
 tail -f /var/log/nginx/error.log
 ```

```php
// Adicione logs detalhados no endpoint
error_log("Postback recebido: " . json_encode($_GET));
```

#### 4. Dados inconsistentes nos relatórios
**Possíveis causas:**
- Múltiplas implementações do script
- Cache do navegador
- Configuração incorreta de funil

**Soluções:**
- Remova scripts duplicados
- Limpe cache e cookies
- Verifique a configuração do funil de conversão

### Contato para Suporte
- 📧 **Email**: suporte@trackdesk.com
- 💬 **Chat**: Disponível no painel da plataforma
- 📚 **Documentação**: https://docs.trackdesk.com
- 🎥 **Tutoriais**: https://help.trackdesk.com

---

## 📈 Próximos Passos

Após implementar o tracking básico, considere:

1. **Configurar Postback URLs** para integração com outras plataformas
2. **Implementar tracking de eventos personalizados**
3. **Configurar relatórios automatizados**
4. **Integrar com ferramentas de BI** para análises avançadas
5. **Configurar alertas** para performance de campanhas

---

*Documentação atualizada em: Janeiro 2024*
*Versão: 2.0*