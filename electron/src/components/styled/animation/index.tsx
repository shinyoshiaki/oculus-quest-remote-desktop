import styled from "styled-components";

export const FadeIn = styled.div`
  animation: fadeIn 2s ease 0s 1 normal;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
