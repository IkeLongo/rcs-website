export interface DoProps {
  animation: object;
  title: string;
  description: string;
  link: string;
  className?: string;
}

export interface OptionProps {
  icon: string;
  title: string;
}

export interface MobilePricingProps {
  selectedIndex: number;
}

export interface CardProps {
  key: string;
  title: string | React.ReactNode;
  monthlyPrice: string;
  totalPrice: string;
  planName: string | React.ReactNode;
  planDescription: string;
  features: string[];
};

export interface MobileClientProps { 
  selectedIndex: number;
}

export interface FooterProps {
  bgGradientClass: string;
}

export interface BlockProps {
  iconRoute: string;
  iconDescription: string;
  iconWidth: string;
  title: string;
  bgImageClass: string;
  blockId: string;
  onClick: () => void;
  top: string;
}

export interface InfoBlockProps {
  selectedBlock: string;
  onBack: () => void;
  isTransitioning: boolean;
}

export interface AccordionItemProps {
  animation: object;
  iconDescription: string;
  title: string;
  description: string;
  className?: string;
}

export interface TeamMember {
  memberName: string;
  position: string;
  imageRoute: string;
  imageAvatar?: string; // ✅ Add this line
  imageDescription: string;
  imagePosition?: string; // ✅ Add this line
  bgImageClass: string;
  top?: string;
  right?: string;
  description: string; // ✅ Add this line
  profileLink: string;
  profileUsername?: string; // ✅ Add this line
}


export interface ProfilesProps {
  team: TeamMember[];
}

export interface MainTeamMemberProps {
  memberName: string;
  position: string;
  bgImageClass: string;
  className?: string; // ✅ Add className as an optional prop
  onClick?: () => void; // ✅ Ensure onClick is properly typed
}

export interface SubTeamMemberProps {
  imageRoute: string;
  imageDescription: string;
  top: string;
  right: string;
  className?: string; // ✅ Add className as an optional prop
  onClick?: () => void; // ✅ Ensure onClick is properly typed
}

export interface PreferencesModalProps {
  isOpen: boolean; // ✅ Indicates if the modal is open
  onClose: () => void; // ✅ Function that closes the modal
}

export interface PrivacyFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  type: string;
  description: string;
}

