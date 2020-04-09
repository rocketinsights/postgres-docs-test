import React from 'react';
import Tree from './tree';
import { StaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { ExternalLink } from 'react-feather';
import config from '../../../config';
import Link from '../link';
import constants from '../../constants';

// eslint-disable-next-line no-unused-vars
const ListItem = styled(({ className, active, level, ...props }) => {
  return (
    <li className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </li>
  );
})`
  list-style: none;

  a {
    color: ${constants.brand_accent} !important;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      text-decoration: underline;
    }

    ${props =>
      props.active &&
      `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      color: #00adf2;
      float: right;
      margin-right: 1rem;
    }
  }
`;

const Sidebar = styled('aside')`
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  background-color: #f9fafc;
  padding-right: 0;
  -webkit-box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);
  @media (max-width: 760px) {
    display: none;
  }
`;

const SectionTitle = styled(props => (
  <li {...props}>
    <div>{props.children}</div>
  </li>
))`
  list-style: none;

  div {
    font-weight: 700;
    padding: 0.5rem 1rem;
  }
`;

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`;

const SidebarLayout = ({ location }) => (
  <StaticQuery
    query={graphql`
      query {
        allMdx {
          edges {
            node {
              fields {
                slug
                title
              }
            }
          }
        }
      }
    `}
    render={({ allMdx }) => {
      return (
        <Sidebar>
          {config.sidebar.title ? (
            <Link to="/">
              <div
                className={'sidebarTitle hiddenMobile'}
                dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
              />
            </Link>
          ) : null}
          <ul className={'sideBarUL'}>
            <SectionTitle>Products</SectionTitle>
            <Tree edges={allMdx.edges} />
            {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}
            {config.sidebar.links.map((link, key) => {
              if (link.link !== '' && link.text !== '') {
                return (
                  <ListItem key={key} to={link.link}>
                    {link.text}
                    <ExternalLink size={14} />
                  </ListItem>
                );
              }
            })}
          </ul>
        </Sidebar>
      );
    }}
  />
);

export default SidebarLayout;
