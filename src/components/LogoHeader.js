import Typography from '@material-ui/core/Typography';
import '../images/pic.ico';

const LogoHeader = () => (
  <header>
    <div>
      <br />
      <img alt="todo managery logo" src="pic.ico" />
      <br />
      <br />
      <Typography variant="h3">Welcome to Todo Managery</Typography>
      <br />
      <br />
      <Typography variant="h6">Where you can manage your todos easily</Typography>
    </div>
    <br />
    <br />
  </header>
);

export default LogoHeader;
