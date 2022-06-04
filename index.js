//criadora de ação para realizar o vestibular
const realizarVestibular = (nome, cpf) => {
    const entre6E10 = Math.random() <= 0.7;
    const nota = entre6E10 ? 6 + Math.random() * 4 : Math.random() * 6;
    return {
        type: "REALIZAR_VESTIBULAR",
        payload: {
            nome, cpf, nota
        }
    }
}

//função criadora de ação
const realizarMatricula  = (cpf, status) => {
    return {
        type: "REALIZAR_MATRICULA",
        payload: {cpf, status}
    }
}

//reducer manipula a seguinte lista
//[{cpf: 1, nome: "Ana", nota: 10}, {cpf: 2, nome: "Ana2", nota: 10}]
const historicoVestibular = (historicoVestibularAtual = [], acao) => {
    if (acao.type === "REALIZAR_VESTIBULAR"){
        return [...historicoVestibularAtual, acao.payload]
    }
    return historicoVestibularAtual
}
//reducer manipula a seguinte lista
//[{cpf: 1, status: M}, {cpf: 2, status: M}, {cpf: 3, status: NM}]
const historicoMatriculas = (historicoMatriculasAtual = [], acao) => {
    if (acao.type === "REALIZAR_MATRICULA"){
        return [...historicoMatriculasAtual, acao.payload]
    }
    return historicoMatriculasAtual
}