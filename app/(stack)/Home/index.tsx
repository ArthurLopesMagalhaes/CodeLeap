import { useEffect, useState } from "react";
import { FlatList, Alert } from "react-native";

import { FormWrapper, Header, OpenModalButtonContainer } from "./styles";
import { useTheme } from "styled-components";

import { CodeLeapAPI } from "../../../src/actions/codeleap-api";
import { PostData } from "../../../src/@types/Posts";

import { Text } from "../../../src/components/Text";
import { PostsForm } from "../../../src/components/PostsForm";
import { Divider } from "../../../src/components/Divider";
import { PostsCard } from "../../../src/components/PostCard";
import { Button } from "../../../src/components/Button";
import {
  ModalConfirmation,
  ModalType,
} from "../../../src/components/ModalConfirmation";

interface IModalStatus {
  open: boolean;
  type: ModalType;
}

const Home = () => {
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [modalStatus, setModalStatus] = useState<IModalStatus>({
    open: false,
    type: "edit",
  });
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [actualPost, setActualPost] = useState<number>(0);

  const { colors } = useTheme();

  const openDeleteModal = (postId: number) => {
    setModalStatus({ open: true, type: "delete" });
    setActualPost(postId);
  };

  const openEditModal = (postId: number) => {
    setModalStatus({ open: true, type: "edit" });
    setActualPost(postId);
  };

  const closeFormAndRefetch = () => {
    setOpenCreatePostModal(false);
    getPosts();
  };

  const getPosts = async () => {
    try {
      const response = await CodeLeapAPI.getPosts();
      setPosts(response.data.results);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    getPosts();
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
          <PostsForm
            onClosePress={() => setOpenCreatePostModal(false)}
            closeForm={closeFormAndRefetch}
          />
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
          refreshing={loadingPosts}
          onRefresh={() => getPosts()}
          renderItem={({ item }) => (
            <PostsCard
              data={item}
              onDeletePress={() => openDeleteModal(item.id)}
              onEditPress={() => openEditModal(item.id)}
            />
          )}
        />
      )}
      <ModalConfirmation
        type={modalStatus.type}
        visible={modalStatus.open}
        refetchPosts={getPosts}
        onCancelPress={() =>
          setModalStatus({
            open: false,
            type: "edit",
          })
        }
        postId={actualPost}
      />
    </>
  );
};

export default Home;
