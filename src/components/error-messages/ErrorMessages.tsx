import { component$ } from '@builder.io/qwik';

type ErrorMessagesProps = {
  failed?: boolean;
  messages?: string[];
};

export default component$<ErrorMessagesProps>((props) => {
  return props.failed && props.messages?.length ? (
    <>
      {props.messages.map((error) => (
        <div
          key={error}
          class='flex-it grow text-xs bg-red-400 text-white p-3 pl-3 mt-1 rounded-md'
        >
          {error}
        </div>
      ))}
    </>
  ) : null;
});
