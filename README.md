1. 설명  
- 실무에서 서비스를 운영하면서 모델링했던, 그리고 아마 일반적인 리뷰 시스템을 GraphQL + Apollo server를 사용하여 개발해보았습니다.
회사에서는 GraphQL 스키마에 데코레이터를 추가하고 내부 코드 생성기를 사용해서 Typescript 인터페이스 코드를 생성하고 그에 맞춰 Resolver를 구현하고 있는데,
코드생성기가 없는 환경에서는 어떻게 개발하는지 궁금해서 진행하게 되었습니다.  
- 이 프로젝트에서도 위와 마찬가지로 schema-first 방식으로 개발하였고 코드 생성기는 아래 링크의 라이브러리를 사용했습니다.  
https://www.the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga

2. 사용 기술
- node.js, typescript, express, graphql, apollo-server

3. 문제 및 해결방법  
- 개발하면서 코드 생성기를 사용하여 생성된 타입 인터페이스와 graphql resolver에서 리턴하는 결과 객체의 타입이 달라서 에러가 나는 문제가 있었는데,
커스텀 타입을 작성하고 위 코드 생성기의 mapper라는 옵션을 사용하여 커스텀 타입을 등록해서 사용하는 방법으로 해결했습니다.


