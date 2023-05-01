import { useTheme } from "styled-components";
import { Text } from "../Text";
import { AuthorAndTime, Container, Content, Header, Icons } from "./styles";
import { Divider } from "../Divider";

import TrashSvg from "../../assets/svgs/trash-bin.svg";
import EditSvg from "../../assets/svgs/edit.svg";
import { PostData } from "../../@types/Posts";

interface IPostCard {
  data: PostData;
  onDeletePress: () => void;
  onEditPress: () => void;
}

export const PostsCard = ({ data, onDeletePress, onEditPress }: IPostCard) => {
  const { colors } = useTheme();

  return (
    <Container>
      <Header>
        <Text size={14} weight="700" color={colors.white}>
          {data.title}
        </Text>
        <Icons>
          <TrashSvg width={24} onPress={onDeletePress} />
          <EditSvg width={24} onPress={onEditPress} />
        </Icons>
      </Header>
      <Content>
        <AuthorAndTime>
          <Text weight="700" size={14} color={colors.gray_300}>
            @{data.username}
          </Text>
          <Text size={12} color={colors.gray_300}>
            25 minutes ago
          </Text>
        </AuthorAndTime>
        <Divider top={12} />
        <Text size={14}>{data.content}</Text>
      </Content>
    </Container>
  );
};
