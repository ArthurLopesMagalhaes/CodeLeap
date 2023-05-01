import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { FormWrapper, Header, OpenModalButtonContainer } from "./styles";

import { Text } from "../../../src/components/Text";
import { useTheme } from "styled-components";
import { PostsForm } from "../../../src/components/PostsForm";
import { Divider } from "../../../src/components/Divider";
import { PostsCard } from "../../../src/components/PostCard";
import {
  ModalConfirmation,
  ModalType,
} from "../../../src/components/ModalConfirmation";
import { CodeLeapAPI } from "../../../src/actions/codeleap-api";
import { postMock } from "../../../src/mocks/postsMock";
import { PostData } from "../../../src/@types/Posts";
import { Button } from "../../../src/components/Button";

const Home = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | "">("");
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { colors } = useTheme();

  const handleDeleteItem = async (postId: number) => {
    setModalType("delete");
    console.log(postId);
    const response = await CodeLeapAPI.deletePost(postId);
    console.log(response.data);
  };

  const handleEditItem = (postId: number) => {
    setModalType("edit");
    console.log(postId);
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await CodeLeapAPI.getPosts();
        setPosts(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
    setLoadingPosts(false);
  }, []);

  return (
    <>
      <Header>
        <Text weight="700" size={22} color={colors.white}>
          CodeLeap Network
        </Text>
      </Header>
      {openCreatePostModal ? (
        <FormWrapper>
          <PostsForm onClosePress={() => setOpenCreatePostModal(false)} />
          <Divider top={12} />
        </FormWrapper>
      ) : (
        <OpenModalButtonContainer>
          <Text weight="700" size={18}>
            Any idea? Create a post!
          </Text>
          <Button
            label="+"
            type="primary"
            onPress={() => setOpenCreatePostModal(true)}
          />
        </OpenModalButtonContainer>
      )}
      {!loadingPosts && posts?.length > 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider bottom={12} />}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 12 }}
          renderItem={({ item }) => (
            <PostsCard
              data={item}
              onDeletePress={() => handleDeleteItem(item.id)}
              onEditPress={() => handleEditItem(item.id)}
            />
          )}
        />
      )}
      <ModalConfirmation
        type={modalType}
        visible={modalType !== ""}
        onCancelPress={() => setModalType("")}
        onConfirmPress={() => null}
      />
    </>
  );
};

export default Home;
