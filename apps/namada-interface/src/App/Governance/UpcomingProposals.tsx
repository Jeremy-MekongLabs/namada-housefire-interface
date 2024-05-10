import { SegmentedBar, Stack } from "@namada/components";
import BigNumber from "bignumber.js";
import GovernanceRoutes from "./routes";

import {
  Proposal,
  ProposalStatus,
  ProposalWithExtraInfo,
  Votes,
} from "@namada/types";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { StatusLabel, TypeLabel } from "./ProposalLabels";

const ProposalListItem: React.FC<{
  proposal: Proposal;
  status: ProposalStatus;
  voted: boolean;
  votes: Votes;
}> = ({ proposal }) => {
  const navigate = useNavigate();

  const barData = [
    {
      value: 100,
      color: "#757575",
    },
  ];

  return (
    <Stack
      as="li"
      gap={3}
      onClick={() => navigate(GovernanceRoutes.proposal(proposal.id).url)}
      className={clsx(
        "group/proposal cursor-pointer text-sm",
        "rounded-md bg-[#191919] p-4"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <StatusLabel
          className="text-[10px] min-w-38"
          status={{ status: "pending" }}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-[6ch]">#{proposal.id.toString()}</div>
        <div className="flex-1">{proposal.content.title}</div>
        <TypeLabel proposalType={proposal.proposalType} color="dark" />
      </div>

      <SegmentedBar data={barData} />
    </Stack>
  );
};

export const UpcomingProposals: React.FC<{
  allProposals: ProposalWithExtraInfo[];
}> = ({ allProposals }) => {
  const upcomingProposals = allProposals.filter(
    (proposal) => proposal.status.status === "pending"
  );

  const voteSummary = {
    yay: BigNumber(0),
    nay: BigNumber(0),
    abstain: BigNumber(0),
  };

  return (
    <Stack gap={4} as="ul">
      {upcomingProposals.map(({ proposal, status, voted }, index) => (
        <ProposalListItem
          proposal={proposal}
          status={status}
          voted={voted}
          votes={voteSummary}
          key={index}
        />
      ))}
    </Stack>
  );
};
