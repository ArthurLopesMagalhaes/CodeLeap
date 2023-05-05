import { useEffect, useState } from "react";
import { Alert } from "react-native";

import {
  ButtonsBox,
  FormWrapper,
  Header,
  OpenModalButtonContainer,
} from "./styles";
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
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  SlideInLeft,
} from "react-native-reanimated";

interface IModalStatus {
  open: boolean;
  type: ModalType;
}

const Home = () => {
  const theme = useTheme();

  const [posts, setPosts] = useState<PostData[]>([]);
  const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [actualPost, setActualPost] = useState<number>(0);
  const [modalStatus, setModalStatus] = useState<IModalStatus>({
    open: false,
    type: "edit",
  });
  const [page, setPage] = useState({
    next: "",
    previous: "",
  });

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

  const getPosts = async (page?: string) => {
    try {
      setLoadingPosts(true);
      const { data } = await CodeLeapAPI.getPosts(page ? page : "");
      setPosts(data.results);
      setPage({ next: data.next, previous: data.previous });
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
        <Animated.View layout={Layout.springify()}>
          <FormWrapper>
            <PostsForm
              onClosePress={() => setOpenCreatePostModal(false)}
              closeForm={closeFormAndRefetch}
            />
            <Divider top={12} />
          </FormWrapper>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn.delay(500)} exiting={FadeOut}>
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
        </Animated.View>
      )}
      {!loadingPosts && posts?.length > 0 && (
        <Animated.FlatList
          layout={Layout.springify()}
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <Divider bottom={12} />}
          contentContainerStyle={{ paddingBottom: 60, paddingHorizontal: 12 }}
          ListFooterComponent={
            <>
              <Divider top={12} />
              <ButtonsBox>
                <Button
                  label="<"
                  type={page.previous ? "primary" : "disable"}
                  disabled={!page.previous}
                  onPress={() => getPosts(page.previous)}
                />
                <Button
                  label=">"
                  type={page.next ? "primary" : "disable"}
                  disabled={!page.next}
                  onPress={() => getPosts(page.next)}
                />
              </ButtonsBox>
            </>
          }
          refreshing={loadingPosts}
          onRefresh={() => getPosts()}
          renderItem={({ item, index }) => (
            <Animated.View entering={SlideInLeft.delay(100 * index)}>
              <PostsCard
                data={item}
                onDeletePress={() => openDeleteModal(item.id)}
                onEditPress={() => openEditModal(item.id)}
              />
            </Animated.View>
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
