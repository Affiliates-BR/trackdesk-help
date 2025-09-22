/**
 * Trackdesk Click Tracking Script
 * 
 * Este script deve ser implementado na página de destino para rastrear
 * quando um usuário clica no link do afiliado.
 * 
 * @version 1.0
 * @author Trackdesk
 */

(function() {
    'use strict';

    /**
     * Configuração do Trackdesk Click Tracking
     * 
     * IMPORTANTE: Substitua 'affiliates-br' pelo ID da sua campanha/programa
     */
    const TRACKDESK_CONFIG = {
        campaignId: 'affiliates-br', // Substitua pelo ID da sua campanha
        debug: false, // Ative para debug (apenas em desenvolvimento)
        timeout: 5000 // Timeout em ms para carregamento do script
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
     * Executar tracking de clique
     */
    function trackClick() {
        try {
            if (typeof window.trackdesk === 'function') {
                window.trackdesk(TRACKDESK_CONFIG.campaignId, "click");
                
                if (TRACKDESK_CONFIG.debug) {
                    console.log(`Clique rastreado para campanha: ${TRACKDESK_CONFIG.campaignId}`);
                }
            } else {
                throw new Error('Função trackdesk não está disponível');
            }
        } catch (error) {
            console.error('Erro ao rastrear clique:', error);
        }
    }

    /**
     * Função principal para inicializar o tracking
     */
    async function initClickTracking() {
        try {
            // Inicializar objeto Trackdesk
            initializeTrackdesk();
            
            // Carregar script do Trackdesk
            await loadTrackdeskScript();
            
            // Executar tracking de clique
            trackClick();
            
        } catch (error) {
            console.error('Erro na inicialização do tracking de clique:', error);
        }
    }

    /**
     * Verificar se o DOM está pronto e inicializar
     */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initClickTracking);
    } else {
        initClickTracking();
    }

    /**
     * Expor função para tracking manual (opcional)
     */
    window.TrackdeskClick = {
        track: trackClick,
        config: TRACKDESK_CONFIG
    };

})();