import * as Yup from 'yup';

const cirurgiaoSchema = Yup.object().shape({
        
    nomeSurgeon: Yup.string().required('O nome é obrigatório'),
    telSurgeon: Yup.string().required('O telefone é obrigatório'),
    numCRO: Yup.string().required('O número CRO/CRM é obrigatório'),
    cpf: Yup.string().required('O CPF é obrigatório'),
    emailSurgeon: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    emailConfirm: Yup.string()
        .oneOf([Yup.ref('emailSurgeon'), null], 'Os e-mails devem corresponder')
        .required('A confirmação do e-mail é obrigatória'),
    senhaSurgeon: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    senhaConfirm: Yup.string()
        .oneOf([Yup.ref('senhaSurgeon'), null], 'As senhas devem corresponder')
        .required('A confirmação de senha é obrigatória'),

});

const distribuidorSchema = Yup.object().shape({

    nomeRepresentante: Yup.string().required('O nome do representante é obrigatório'),
    telRepresentante: Yup.string().required('O telefone é obrigatório'),
    nomeEmpresa: Yup.string().required('O nome da empresa é obrigatório'),
    enderecoEmpresa: Yup.string().required('O endereço da empresa é obrigatório'),
    emailRepresentante: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
    emailRepresentanteConfirm: Yup.string()
        .oneOf([Yup.ref('emailRepresentante'), null], 'Os e-mails devem corresponder')
        .required('A confirmação do e-mail é obrigatória'),
    senhaRepresentante: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 caracteres'),
    senhaRepresentanteConfirm: Yup.string()
        .oneOf([Yup.ref('senhaRepresentante'), null], 'As senhas devem corresponder')
        .required('A confirmação de senha é obrigatória'),

});

export { cirurgiaoSchema, distribuidorSchema };