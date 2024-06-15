import './index.scss';

type Props = {
  isLoading: boolean;
};

export const Skeleton = ({ isLoading }: Props) => {
  return (
    <div className={'skeleton ' + (isLoading ? '' : 'not-display')}>
      <div className="rect" />
      <div className="line line1" />
      <div className="line line2" />
    </div>
  );
};
