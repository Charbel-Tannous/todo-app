export default function Modal(props) {
  return (
    <dialog open>
      <article>
        <h3>Confirm your action!</h3>
        <p>
          Mauris non nibh vel nisi sollicitudin malesuada. Donec ut sagittis
          erat. Praesent eu eros felis. Ut consectetur placerat pulvinar.
        </p>
        <footer>
          <div role="button" className="secondary" onClick={props.cancel}>
            Cancel
          </div>
          <div role="button" onClick={props.confirm}>
            Confirm
          </div>
        </footer>
      </article>
    </dialog>
  );
}
