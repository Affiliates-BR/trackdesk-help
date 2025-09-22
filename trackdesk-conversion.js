/**
 * Trackdesk Conversion Tracking Script
 * 
 * Este script deve ser implementado na página de confirmação/obrigado
 * para rastrear conversões.
 * 
 * @version 1.0
 * @author Trackdesk
 */

(function() {
    'use strict';

    /**
     * Configuração do Trackdesk Conversion Tracking
     * 
     * IMPORTANTE: Configure os parâmetros abaixo conforme sua necessidade
     */
    const TRACKDESK_CONFIG = {
        campaignId: 'affiliates-br', // Substitua pelo ID da sua campanha
        debug: false, // Ative para debug (apenas em desenvolvimento)
        timeout: 5000, // Timeout em ms para carregamento do script
        
        // Configuração padrão da conversão
        conversion: {
            conversionType: 'ftd', // Tipo de conversão padrão
            value: null, // Valor da conversão (opcional)
            currency: 'BRL', // Moeda padrão
            orderId: null, // ID do pedido (opcional)
            transactionId: null // ID da transação (opcional)
        }
    };

    /**
     * Tipos de conversão disponíveis
     */
    const CONVERSION_TYPES = {
        FTD: 'ftd', // First Time Deposit
        LEAD: 'lead', // Lead qualificado
        SALE: 'sale', // Venda/Compra
        REGISTRATION: 'registration', // Cadastro/Registro
        DOWNLOAD: 'download', // Download de arquivo/app
        TRIAL: 'trial', // Período de teste
        SUBSCRIPTION: 'subscription', // Assinatura
        CUSTOM: 'custom' // Evento personalizado
    };

    /**
     * Função para carregar o script do Trackdesk de forma assíncrona
     */
    function loadTrackdeskScript() {
        return new Promise((resolve, reject) => {
            // Verificar se o script já foi carregado
            if (window.trackdesk) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.async = true;
            script.src = '//cdn.trackdesk.com/tracking.js';
            
            script.onload = () => {
                if (TRACKDESK_CONFIG.debug) {
                    console.log('Trackdesk script carregado com sucesso');
                }
                resolve();
            };
            
            script.onerror = () => {
                console.error('Erro ao carregar script do Trackdesk');
                reject(new Error('Falha ao carregar script do Trackdesk'));
            };

            document.head.appendChild(script);

            // Timeout de segurança
            setTimeout(() => {
                if (!window.trackdesk) {
                    reject(new Error('Timeout ao carregar script do Trackdesk'));
                }
            }, TRACKDESK_CONFIG.timeout);
        });
    }

    /**
     * Inicializar o objeto Trackdesk
     */
    function initializeTrackdesk() {
        (function(t,d,k){
            (t[k]=t[k]||[]).push(d);
            t[d]=t[d]||t[k].f||function(){
                (t[d].q=t[d].q||[]).push(arguments)
            }
        })(window,"trackdesk","TrackdeskObject");
    }

    /**
     * Validar tipo de conversão
     */
    function validateConversionType(type) {
        const validTypes = Object.values(CONVERSION_TYPES);
        return validTypes.includes(type);
    }

    /**
     * Construir objeto de dados da conversão
     */
    function buildConversionData(options = {}) {
        const data = {
            conversionType: options.conversionType || TRACKDESK_CONFIG.conversion.conversionType
        };

        // Adicionar campos opcionais se fornecidos
        if (options.value !== undefined && options.value !== null) {
            data.value = parseFloat(options.value);
        }

        if (options.currency) {
            data.currency = options.currency;
        }

        if (options.orderId) {
            data.orderId = options.orderId;
        }

        if (options.transactionId) {
            data.transactionId = options.transactionId;
        }

        if (options.planType) {
            data.planType = options.planType;
        }

        // Campos personalizados
        if (options.custom) {
            Object.assign(data, options.custom);
        }

        return data;
    }

    /**
     * Executar tracking de conversão
     */
    function trackConversion(options = {}) {
        try {
            if (typeof window.trackdesk !== 'function') {
                throw new Error('Função trackdesk não está disponível');
            }

            const conversionData = buildConversionData(options);

            // Validar tipo de conversão
            if (!validateConversionType(conversionData.conversionType)) {
                throw new Error(`Tipo de conversão inválido: ${conversionData.conversionType}`);
            }

            // Executar tracking
            window.trackdesk(TRACKDESK_CONFIG.campaignId, "conversion", conversionData);
            
            if (TRACKDESK_CONFIG.debug) {
                console.log(`Conversão rastreada para campanha: ${TRACKDESK_CONFIG.campaignId}`);
                console.log('Dados da conversão:', conversionData);
            }

            return true;
        } catch (error) {
            console.error('Erro ao rastrear conversão:', error);
            return false;
        }
    }

    /**
     * Função principal para inicializar o tracking
     */
    async function initConversionTracking(options = {}) {
        try {
            // Inicializar objeto Trackdesk
            initializeTrackdesk();
            
            // Carregar script do Trackdesk
            await loadTrackdeskScript();
            
            // Executar tracking de conversão
            return trackConversion(options);
            
        } catch (error) {
            console.error('Erro na inicialização do tracking de conversão:', error);
            return false;
        }
    }

    /**
     * Função para extrair dados da URL (query parameters)
     */
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const data = {};
        
        // Parâmetros comuns que podem vir da URL
        if (params.get('value')) data.value = params.get('value');
        if (params.get('currency')) data.currency = params.get('currency');
        if (params.get('order_id')) data.orderId = params.get('order_id');
        if (params.get('transaction_id')) data.transactionId = params.get('transaction_id');
        if (params.get('conversion_type')) data.conversionType = params.get('conversion_type');
        
        return data;
    }

    /**
     * Função para extrair dados de elementos HTML
     */
    function getDataFromElements() {
        const data = {};
        
        // Buscar por elementos com data attributes
        const valueElement = document.querySelector('[data-conversion-value]');
        if (valueElement) data.value = valueElement.getAttribute('data-conversion-value');
        
        const currencyElement = document.querySelector('[data-conversion-currency]');
        if (currencyElement) data.currency = currencyElement.getAttribute('data-conversion-currency');
        
        const orderElement = document.querySelector('[data-order-id]');
        if (orderElement) data.orderId = orderElement.getAttribute('data-order-id');
        
        const transactionElement = document.querySelector('[data-transaction-id]');
        if (transactionElement) data.transactionId = transactionElement.getAttribute('data-transaction-id');
        
        const typeElement = document.querySelector('[data-conversion-type]');
        if (typeElement) data.conversionType = typeElement.getAttribute('data-conversion-type');
        
        return data;
    }

    /**
     * Auto-inicialização com dados da página
     */
    function autoInitialize() {
        // Combinar dados da URL e elementos HTML
        const urlData = getUrlParams();
        const elementData = getDataFromElements();
        const combinedData = { ...urlData, ...elementData };
        
        if (TRACKDESK_CONFIG.debug) {
            console.log('Dados extraídos automaticamente:', combinedData);
        }
        
        // Inicializar tracking com dados combinados
        initConversionTracking(combinedData);
    }

    /**
     * Verificar se o DOM está pronto e inicializar
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInitialize);
    } else {
        autoInitialize();
    }

    /**
     * Expor API pública para uso manual
     */
    window.TrackdeskConversion = {
        track: trackConversion,
        init: initConversionTracking,
        config: TRACKDESK_CONFIG,
        types: CONVERSION_TYPES,
        
        // Métodos de conveniência para tipos específicos
        trackSale: (value, currency = 'BRL', orderId = null) => {
            return trackConversion({
                conversionType: CONVERSION_TYPES.SALE,
                value: value,
                currency: currency,
                orderId: orderId
            });
        },
        
        trackLead: (customData = {}) => {
            return trackConversion({
                conversionType: CONVERSION_TYPES.LEAD,
                ...customData
            });
        },
        
        trackFTD: (value, currency = 'BRL', transactionId = null) => {
            return trackConversion({
                conversionType: CONVERSION_TYPES.FTD,
                value: value,
                currency: currency,
                transactionId: transactionId
            });
        },
        
        trackRegistration: (customData = {}) => {
            return trackConversion({
                conversionType: CONVERSION_TYPES.REGISTRATION,
                ...customData
            });
        },
        
        trackTrial: (planType = null, customData = {}) => {
            return trackConversion({
                conversionType: CONVERSION_TYPES.TRIAL,
                planType: planType,
                ...customData
            });
        }
    };

})();