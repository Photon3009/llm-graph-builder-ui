import {
  MoonIconOutline,
  SunIconOutline,
  TrashIconOutline,
  ArrowLeftIconOutline,
  ArrowDownTrayIconOutline,
} from '@neo4j-ndl/react/icons';
import { Button, TextLink, useSpotlightContext } from '@neo4j-ndl/react';
import { memo, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { IconButtonWithToolTip } from '../UI/IconButtonToolTip';
import { buttonCaptions, tooltips } from '../../utils/Constants';
import { ThemeWrapperContext } from '../../context/ThemeWrapper';
import { useCredentials } from '../../context/UserCredentials';
import { useNavigate } from 'react-router';
import { useMessageContext } from '../../context/UserMessages';
import { RiChatSettingsLine } from 'react-icons/ri';
import ChatModeToggle from '../ChatBot/ChatModeToggle';
import { HeaderProp } from '../../types';
import { downloadClickHandler, getIsLoading } from '../../utils/Utils';

const Header: React.FC<HeaderProp> = ({ chatOnly, deleteOnClick, setOpenConnection, showBackButton }) => {
  const { colorMode, toggleColorMode } = useContext(ThemeWrapperContext);
  const navigate = useNavigate();
  const { messages } = useMessageContext();
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);
  const { connectionStatus } = useCredentials();
  const chatAnchor = useRef<HTMLDivElement>(null);
  const [showChatModeOption, setShowChatModeOption] = useState<boolean>(false);
  const { setIsOpen } = useSpotlightContext();
  const isFirstTimeUser = useMemo(() => {
    return localStorage.getItem('neo4j.connection') === null;
  }, []);
  useEffect(() => {
    if (!connectionStatus && isFirstTimeUser) {
      setIsOpen(true);
    }
  }, [connectionStatus, isFirstTimeUser, setIsOpen]);

  const onBackButtonClick = () => {
    navigate('/', { state: messages });
  };

  return (
    <>
      <div className='text-secondary-foreground p-3 border-b border-primary/20' style={{ backgroundColor: '#000000' }}>
        <nav
          className='flex items-center justify-between flex-row'
          role='navigation'
          data-testid='navigation'
          id='navigation'
          aria-label='main navigation'
        >
          {/* <section className='flex w-1/3 shrink-0 grow-0 items-center min-w-[200px]'>
            <Typography variant='h1'>
              <img
                src={colorMode === 'dark' ? Neo4jLogoBW : Neo4jLogoColor}
                className='h-8! min-h-8 min-w-8'
                alt='Neo4j Logo'
              />
            </Typography>
          </section> */}
          {!chatOnly ? (
            <section className='items-center justify-center w-full grow-0 flex'>
              <div className='w-full'>
                <div
                  className='inline-flex gap-x-1 w-full'
                  style={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: '4px' }}
                >
                  {' '}
                  <nav className='flex items-center justify-center w-full p-2'>
                    <h1 className='text-2xl font-bold' style={{ color: '#caf800' }}>
                      Grappus AI
                    </h1>
                  </nav>
                  {/* <IconButtonWithToolTip
                    text={tooltips.documentation}
                    onClick={() => handleURLClick('https://neo4j.com/labs/genai-ecosystem/llm-graph-builder')}
                    size='large'
                    clean
                    placement='left'
                    label={tooltips.documentation}
                  >
                    <InformationCircleIconOutline className='n-size-token-7' />
                  </IconButtonWithToolTip>

                  <IconButtonWithToolTip
                    label={tooltips.github}
                    onClick={() => handleURLClick('https://github.com/neo4j-labs/llm-graph-builder/issues')}
                    text={tooltips.github}
                    size='large'
                    clean
                  >
                    <CodeBracketSquareIconOutline />
                  </IconButtonWithToolTip> */}
                  {/* <IconButtonWithToolTip
                    label={tooltips.theme}
                    text={tooltips.theme}
                    clean
                    size='large'
                    onClick={toggleColorMode}
                    placement='left'
                  >
                    {colorMode === 'dark' ? (
                      <span role='img' aria-label='sun'>
                        <SunIconOutline />
                      </span>
                    ) : (
                      <span role='img' aria-label='moon'>
                        <MoonIconOutline />
                      </span>
                    )}
                  </IconButtonWithToolTip> */}
                  {/* <IconButtonWithToolTip
                    label={tooltips.openChatPopout}
                    onClick={openChatPopout}
                    text={tooltips.openChatPopout}
                    size='large'
                    clean
                    disabled={getIsLoading(messages)}
                  >
                    <ArrowTopRightOnSquareIconOutline />
                  </IconButtonWithToolTip>
                  {!SKIP_AUTH && <Profile />}
                  {pathname === '/readonly' &&
                    (!connectionStatus ? (
                      <SpotlightTarget id='loginbutton' hasPulse={true} indicatorVariant='border' ref={firstTourTarget}>
                        <Button type='button' fill='outlined' onClick={() => loginWithRedirect()}>
                          Login
                        </Button>
                      </SpotlightTarget>
                    ) : (
                      <Button type='button' fill='outlined' onClick={() => loginWithRedirect()}>
                        Login
                      </Button>
                    ))} */}
                </div>
              </div>
            </section>
          ) : (
            <section className='items-center justify-end w-1/3 grow-0 flex'>
              <div
                className='inline-flex gap-x-1'
                style={{ display: 'flex', flexGrow: 0, alignItems: 'center', gap: '4px' }}
              >
                {!connectionStatus && (
                  <Button
                    size={'medium'}
                    className={`${chatOnly ? '' : 'mr-2.5'}`}
                    onClick={() => {
                      if (setOpenConnection) {
                        setOpenConnection((prev) => ({ ...prev, openPopUp: true }));
                      }
                    }}
                  >
                    {buttonCaptions.connectToNeo4j}
                  </Button>
                )}
                {showBackButton && (
                  <IconButtonWithToolTip
                    onClick={onBackButtonClick}
                    clean
                    text='Back'
                    placement='bottom'
                    label='Back'
                    disabled={getIsLoading(messages)}
                  >
                    <ArrowLeftIconOutline />
                  </IconButtonWithToolTip>
                )}
                <IconButtonWithToolTip
                  label={tooltips.theme}
                  text={tooltips.theme}
                  clean
                  size='large'
                  onClick={toggleColorMode}
                  placement='bottom'
                >
                  {colorMode === 'dark' ? (
                    <span role='img' aria-label='sun'>
                      <SunIconOutline />
                    </span>
                  ) : (
                    <span role='img' aria-label='moon'>
                      <MoonIconOutline />
                    </span>
                  )}
                </IconButtonWithToolTip>
                <div ref={chatAnchor}>
                  <IconButtonWithToolTip
                    onClick={() => {
                      setShowChatModeOption(true);
                    }}
                    clean
                    text='Chat mode'
                    placement='bottom'
                    label='Chat mode'
                  >
                    <RiChatSettingsLine />
                  </IconButtonWithToolTip>
                </div>
                <>
                  <IconButtonWithToolTip
                    text={tooltips.downloadChat}
                    aria-label='Download Chat'
                    clean
                    onClick={() =>
                      downloadClickHandler(
                        { conversation: messages },
                        downloadLinkRef,
                        'graph-builder-conversation.json'
                      )
                    }
                    disabled={messages.length === 1 || getIsLoading(messages)}
                    placement={chatOnly ? 'left' : 'bottom'}
                    label={tooltips.downloadChat}
                  >
                    <span ref={downloadLinkRef}></span>
                    <ArrowDownTrayIconOutline />
                  </IconButtonWithToolTip>
                  <>
                    <TextLink ref={downloadLinkRef} className='hidden!'>
                      ""
                    </TextLink>
                  </>
                </>
                <IconButtonWithToolTip
                  text={tooltips.clearChat}
                  aria-label='Remove chat history'
                  clean
                  onClick={deleteOnClick}
                  disabled={messages.length === 1 || getIsLoading(messages)}
                  placement={chatOnly ? 'left' : 'bottom'}
                  label={tooltips.clearChat}
                >
                  <TrashIconOutline />
                </IconButtonWithToolTip>
              </div>
            </section>
          )}
        </nav>
      </div>
      <ChatModeToggle
        closeHandler={(_, reason) => {
          if (reason.type === 'backdropClick') {
            setShowChatModeOption(false);
          }
        }}
        open={showChatModeOption}
        menuAnchor={chatAnchor}
        isRoot={false}
      />
    </>
  );
};
export default memo(Header);
