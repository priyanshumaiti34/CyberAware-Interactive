
import PageWrapper from "@/components/page-wrapper";
import SteganographyChallengeUi from "@/components/steganography-challenge-ui";

export default function SteganographyChallengePage() {
    return (
        <PageWrapper>
             <div className="flex-grow flex items-center justify-center">
                <SteganographyChallengeUi />
             </div>
        </PageWrapper>
    )
}
