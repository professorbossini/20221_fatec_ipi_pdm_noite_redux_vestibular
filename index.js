const redux = require ('redux')
const prompts = require ('prompts')

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

const todosOsReducers = redux.combineReducers({
    historicoMatriculas,
    historicoVestibular
})

const store = redux.createStore(todosOsReducers)

const main = async () => {
    const menu = "1-Realizar Vestibular\n2-Realizar Matrícula\n3-Visualizar meu status\n4-Visualizar a lista de aprovados\n0-Sair"
    let response
    do{
        response = await prompts({
            type: "number",
            name: "op",
            message: menu
        })
        switch (response.op){
            case 1:{
                //1. pegar o nome do usuário
                const { nome } = await prompts({
                    type: 'text',
                    name: 'nome',
                    message: "Digite seu nome"
                })
                //2. pegar o cpf do usuário
                const { cpf } = await prompts({
                    type: 'text',
                    name: "cpf",
                    message: "Digite seu cpf"
                })
                //3. construir uma acao apropriada
                const acao = realizarVestibular(nome, cpf)
                //4. fazer dispatch da acao
                store.dispatch(acao)
                break;
            }
            case 2:
                //1. pegar o cpf com prompts
                const { cpf } = prompts({
                    type: 'text',
                    name: 'cpf',
                    message: 'Digite seu cpf'
                })
                //2. checar se a pessoa está aprovada no estado centralizado (store.getState().historicoVestibular.find)
                const aprovado = store.getState().historicoVestibular.find(aluno => aluno.cpf === cpf && aluno.nota >= 6)
                //3. Produzir uma acao apropriada: o status poderá ser M ou NM
                store.dispatch(realizarMatricula(cpf, aprovado ? "M" : "NM"))
                break;
        }

    }while (response.op !== 0)
}

