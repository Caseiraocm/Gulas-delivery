# Gullas Delivery — estrutura organizada

Esta etapa apenas separa apresentação e comportamento do arquivo HTML original, preservando a ordem dos blocos.

- `index.html`: estrutura HTML e referências externas.
- `css/styles.css`: todos os blocos CSS originais, na mesma ordem de cascata.
- `js/script-XX.js`: blocos JavaScript externos, mantidos na mesma posição lógica do documento.
- `assets/`: reservado para imagens/ícones locais na próxima etapa.

Importante: a divisão funcional fina (pedidos, caixa, mesas, impressão, cashback etc.) deve ser feita depois de validar esta separação estrutural, porque o código atual compartilha variáveis e funções globais.
