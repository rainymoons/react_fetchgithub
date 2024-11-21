import { useEffect, useState } from "react";
import Post from "./components/Post";

export default function App() {
  const jsonplaceholderApiUrl = "https://jsonplaceholder.typicode.com/posts";

  const [fetching, setFetching] = useState(true);
  // 수정하기 위해 데이터를 가지고 있을 State 생성
  const [posts, setPosts] = useState([]); // 초기값 설정이 중요. 밑에서 map을 사용할 수 있는 것은 내가 받아올 데이터가 배열이기 때문임. String이면 ""로.
  // 언제 끝날지 모르니까 return에서는 타입을 정확하게 지정해줘야함.

  useEffect(() => {
    setFetching(true);

    // componentDidMount (Component가 최초로 실행되었을 때, 한번만 실행하자)
    const getPosts = async () => {
      const response = await fetch(jsonplaceholderApiUrl); // fetch(githubApiUrl); 이렇게만 적어도 get 요청. 대기한 결과를 response에 담음
      console.log(response);

      const status = response.status;
      const isOk = response.ok;

      console.log("status", status);
      console.log("isOk", isOk);

      //
      const postsJson = await response.json(); // response의 body에 있던 내용을 준다. 값을 읽을때 얼마나 걸릵지 알수가 없다. -> await
      console.log(postsJson);

      // setPosts와 getPosts();를 useEffect로 감싸야 함.
      setPosts(postsJson); //여기서 작성하면 사이드이펙트 발생 -> 컴포넌트가 만들어질때 (처음 실행될때)에만 실행되어야 함. -> useEffect();
      setFetching(false);
    };

    getPosts();
  }, []);

  return (
    // fetching이 false일때 &&의 빠른연산이 적용되어 뒤에가 실행됨. true일 경우 실행 안됨.
    // fetchingdl true이면 데이터를 불러오는 중이거나 데이터가 없음.
    <ul>
      {fetching && <p>데이터를 가져오는 중입니다. 잠시만 기다려주세요.</p>}
      {!fetching &&
        posts.map(({ id, userId, title, body }) => (
          <Post key={id} id={id} userId={userId} title={title} body={body} />
        ))}
    </ul>
  );
}
