const path = require("path");
const cp = require("child_process");
const core = require("@actions/core");

const { status, stdout } = cp.spawnSync("curl", [
  `https://www.duckdns.org/update?domains=${process.env.INPUT_DOMAIN}&token=${process.env.INPUT_TOKEN}&txt=dnslink=/ipfs/${process.env.INPUT_CID}`,
]);

if (status !== 0) {
  process.exit(status);
}

core.setOutput("result", stdout.toString());

if (stdout.toString() !== 'OK') {
  process.exit(1);
}
