interface TestComponentProps {
  data?: string;
}

export const TestComponent = ({ data }: TestComponentProps) => {
  return (
    <div>
      <div>---! TestComponent !---</div>
      {data && <div>{data}</div>}
    </div>
  );
};
