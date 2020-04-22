import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../context/AuthContext';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Backgroud } from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

const SingIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, singIn } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Este campo e obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Este campo e obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        singIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        const erros = getValidationErrors(err);

        formRef.current?.setErrors(erros);
      }
    },
    [singIn],
  );
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Entrar</Button>

          <a href="t">Esqueci minha senha</a>
        </Form>

        <a href="l">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Backgroud />
    </Container>
  );
};

export default SingIn;
