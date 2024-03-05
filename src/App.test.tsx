// import { screen, waitFor } from "@testing-library/react"
// import App from "./App"
// import { renderWithProviders } from "./utils/test-utils"
import Reddit from "./features/Reddit/Reddit";

describe('Reddit Class', () => {
  describe('method: getAccessToken', () => {
    test('should return a valid access token in type of String', async () => {
      const userName: string = 'Noir_Joe';
      const password: string = 'mellow-deflate-umiak-hippo-acuity-barb-drown-camelot-drive-nonunion-camest-diabetes-chapbook-huddle-enforce';
      const accessToken = await Reddit.getAccessToken(userName, password);

      expect(typeof accessToken).toBe('string');
    });
  })
});
