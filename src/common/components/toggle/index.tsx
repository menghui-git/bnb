import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './index.scss';

type Props = {
  toggled: boolean;
  onClick: () => void;
};

export const Toggle = ({ toggled, onClick }: Props) => {
  return (
    <div className="toggle" data-toggled={toggled}>
      <div className="button" onClick={onClick}>
        <div className="check-icon">
          <FontAwesomeIcon icon={faCheck} />
        </div>
      </div>
    </div>
  );
};
