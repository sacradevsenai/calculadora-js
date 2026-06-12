document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const resultado = document.getElementById('resultado');

    let variavelA = '';
    let operacao = '';
    let variavelB = '';

    // Função auxiliar: converte "3,5" (com vírgula) em 3.5 (número real)
    // Necessária porque parseFloat() só entende ponto como separador decimal.
    function paraNumero(texto) {
        return parseFloat(texto.replace(',', '.'));
    }

    container.addEventListener('click', (e) => {

        // proteção contra miss click
        if (e.target.tagName !== 'BUTTON') {
            return;
        }

        const botaoClicado = e.target.innerText;

        if (botaoClicado === '=') {

            // Evita calcular se o usuário ainda não escolheu uma operação
            if (operacao === '' || variavelA === '') {
                return;
            }

            variavelB = resultado.textContent;

            const a = paraNumero(variavelA);
            const b = paraNumero(variavelB);
            let resultadoCalculo;

            // Erro 5: as 4 operações foram unificadas em um único switch,
            // evitando repetir "parseFloat(variavelA)... operacao = ''" 4 vezes.
            switch (operacao) {
                case '+':
                    resultadoCalculo = a + b;
                    break;
                case '-':
                    resultadoCalculo = a - b;
                    break;
                case '*':
                    resultadoCalculo = a * b;
                    break;
                case '/':
                    // Erro 4: tratamento de divisão por zero
                    if (b === 0) {
                        resultado.textContent = 'Erro';
                        variavelA = '';
                        variavelB = '';
                        operacao = '';
                        return;
                    }
                    resultadoCalculo = a / b;
                    break;
            }

            resultado.textContent = resultadoCalculo;
            operacao = '';

        } else if (botaoClicado === '+' || botaoClicado === '-' || botaoClicado === '*' || botaoClicado === '/') {
            variavelA = resultado.textContent;
            operacao = botaoClicado;
            resultado.textContent = '';

        } else if (botaoClicado === 'C') {
            resultado.textContent = '';
            variavelA = '';
            variavelB = '';
            operacao = '';

        } else if (botaoClicado === '⬅️') {
            resultado.textContent = resultado.textContent.slice(0, -1);

        } else if (botaoClicado === '%') {
            const valorAtual = parseFloat(resultado.textContent);

            if (operacao === '' || variavelA === '') {
                // Sem operação pendente: % transforma o número atual em fração
                // Ex: 50 -> 0.5
                resultado.textContent = valorAtual / 100;
            } else {
                // Com operação pendente: % é relativo a variavelA (o primeiro número)
                // Ex: 200 + 10% -> 10% de 200 = 20
                const a = parseFloat(variavelA);
                resultado.textContent = (a * valorAtual) / 100;
            }

        } else if (botaoClicado === ',') {
            // Erro 3: agora a vírgula só é adicionada se ainda não existir uma
            if (!resultado.textContent.includes(',')) {
                resultado.textContent += ',';
            }

        } else {
            // Se não for nenhum comando especial nem operador, é número!
            resultado.textContent += botaoClicado;
        }

    });
});