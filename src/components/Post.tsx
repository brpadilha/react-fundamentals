import { format, formatDistanceToNow } from "date-fns";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";
import { ptBR } from "date-fns/locale";
import { FormEvent, useState } from "react";

type PostProps = {
  author: {
    name: string;
    avatarUrl: string;
    role: string;
  };
  publishedAt: Date;
  content: {
    type: "paragraph" | "link";
    content: string;
  }[];
};

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(["Post muito bacana"]);
  const [newCommnet, setNewComment] = useState("");
  const isNewCommentEmpty = newCommnet.trim() === "";

  function handleCreateNewComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setComments([...comments, newCommnet]);
    setNewComment("");
  }

  function handleNewCommnet(event: React.ChangeEvent<HTMLTextAreaElement>) {
    event?.target.setCustomValidity("");

    setNewComment(event?.target.value);
  }

  function onDeleteComment(commentToDelete: string) {
    const commentsWithoutDeletedOne = comments.filter(
      (comment) => comment !== commentToDelete
    );

    setComments(commentsWithoutDeletedOne);
  }

  function handleNewCommentInvalid(
    event: React.InvalidEvent<HTMLTextAreaElement>
  ) {
    event.target.setCustomValidity("O comentário não pode ser vazio");
  }

  const lines = {
    paragraph: (content: string) => <p key={content}>{content}</p>,
    link: (content: string) => (
      <a key={content} href="#">
        {content}
      </a>
    ),
  };

  const publishedDateFormatted = format(
    publishedAt,
    "d 'de' MMMM 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedDateFormatted}
          dateTime={publishedAt.toISOString()}
        >
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          return lines[line.type](line.content);
        })}
        <p>
          <a href="#">#novoprojeto</a> <a href="">#nlw</a>{" "}
          <a href="">#rocketseat</a>{" "}
        </p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder="Deixe um comentário"
          name="comment"
          value={newCommnet}
          onChange={handleNewCommnet}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment
            key={comment}
            content={comment}
            onDeleteComment={onDeleteComment}
          />
        ))}
      </div>
    </article>
  );
}
