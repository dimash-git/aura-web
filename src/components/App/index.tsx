import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "@/auth";
import { useSelector } from "react-redux";
import { selectors } from "@/store";
import routes, {
  hasNavigation,
  getRouteBy,
  hasNoFooter,
  hasNoHeader,
} from "@/routes";
import BirthdayPage from "../BirthdayPage";
import BirthtimePage from "../BirthtimePage";
import CreateProfilePage from "../CreateProfilePage";
import EmailEnterPage from "../EmailEnterPage";
import SubscriptionPage from "../SubscriptionPage";
import PaymentPage from "../PaymentPage";
import WallpaperPage from "../WallpaperPage";
import StaticPage from "../StaticPage";
import NotFoundPage from "../NotFoundPage";
import Header from "../Header";
import Navbar from "../Navbar";
import Footer from "../Footer";
import "./styles.css";
import DidYouKnowPage from "../DidYouKnowPage";
import FreePeriodInfoPage from "../FreePeriodInfoPage";
import AttentionPage from "../AttentionPage";
import FeedbackPage from "../FeedbackPage";
import CompatibilityPage from "../Compatibility";
import BreathPage from "../BreathPage";
import PriceListPage from "../PriceListPage";
import CompatResultPage from "../CompatResultPage";
import HomePage from "../HomePage";
import UserCallbacksPage from "../UserCallbacksPage";
import BottomNavbar from "../BottomNavbar";

function App(): JSX.Element {
  const [isSpecialOfferOpen, setIsSpecialOfferOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const closeSpecialOffer = () => {
    setIsSpecialOfferOpen(false);
    navigate(routes.client.emailEnter());
  };

  return (
    <Routes>
      <Route element={<Layout setIsSpecialOfferOpen={setIsSpecialOfferOpen} />}>
        <Route path={routes.client.root()} element={<MainPage />} />
        <Route path={routes.client.birthday()} element={<BirthdayPage />} />
        <Route path={routes.client.didYouKnow()} element={<DidYouKnowPage />} />
        <Route
          path={routes.client.freePeriodInfo()}
          element={<FreePeriodInfoPage />}
        />
        <Route
          path={routes.client.attention()}
          element={
            <AttentionPage
              isOpenModal={isSpecialOfferOpen}
              onCloseSpecialOffer={closeSpecialOffer}
            />
          }
        />
        <Route path={routes.client.feedback()} element={<FeedbackPage />} />
        <Route path={routes.client.birthtime()} element={<BirthtimePage />} />
        <Route path={routes.client.createProfile()} element={<SkipStep />} />
        <Route path={routes.client.emailEnter()} element={<EmailEnterPage />} />
        <Route path={routes.client.static()} element={<StaticPage />} />
        <Route
          path={routes.client.compatibility()}
          element={<CompatibilityPage />}
        />
        <Route
          path={routes.client.compatibilityResult()}
          element={<CompatResultPage />}
        />
        <Route path={routes.client.breath()} element={<BreathPage />} />
        <Route path={routes.client.priceList()} element={<PriceListPage />} />
        <Route path={routes.client.home()} element={<HomePage />} />
        <Route
          path={routes.client.breathResult()}
          element={<UserCallbacksPage />}
        />
        <Route element={<PrivateOutlet />}>
          <Route
            path={routes.client.subscription()}
            element={<SubscriptionPage />}
          />
          <Route
            path={routes.client.paymentMethod()}
            element={<PaymentPage />}
          />
          <Route
            path={routes.client.wallpaper()}
            element={<ProtectWallpaperPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

interface LayoutProps {
  setIsSpecialOfferOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Layout({ setIsSpecialOfferOpen }: LayoutProps): JSX.Element {
  const location = useLocation();
  const showNavbar = hasNavigation(location.pathname);
  const showFooter = hasNoFooter(location.pathname);
  const showHeader = hasNoHeader(location.pathname);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const changeIsSpecialOfferOpen = () => setIsSpecialOfferOpen(true);
  return (
    <div className="container">
      <BottomNavbar>
        {showHeader ? (
          <Header
            openMenu={() => setIsMenuOpen(true)}
            clickCross={changeIsSpecialOfferOpen}
          />
        ) : null}
        <main className="content">
          <Outlet />
        </main>
        {showFooter ? <Footer color={showNavbar ? "black" : "white"} /> : null}
        {showNavbar ? (
          <Navbar isOpen={isMenuOpen} closeMenu={() => setIsMenuOpen(false)} />
        ) : null}
      </BottomNavbar>
    </div>
  );
}

function PrivateOutlet(): JSX.Element {
  const { user } = useAuth();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={routes.client.root()} replace={true} />
  );
}

function SkipStep(): JSX.Element {
  const { user } = useAuth();
  return user ? (
    <Navigate to={routes.client.emailEnter()} replace={true} />
  ) : (
    <CreateProfilePage />
  );
}

function MainPage(): JSX.Element {
  const status = useSelector(selectors.selectStatus);
  return <Navigate to={getRouteBy(status)} replace={true} />;
}

function ProtectWallpaperPage(): JSX.Element {
  const status = useSelector(selectors.selectStatus);
  return status === "subscribed" ? (
    <WallpaperPage />
  ) : (
    <Navigate to={getRouteBy(status)} replace={true} />
  );
}

export default App;
