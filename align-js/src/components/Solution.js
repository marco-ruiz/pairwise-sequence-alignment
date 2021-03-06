import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import PresentationPairs from './PresentationPairs';
import SolutionAlignment from './SolutionAlignment';
import { PercentageBar } from './ColoredBar';
import PropertyPresentation from '../property-presentation';
import RgbaColor from '../rgba-color';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    selectedRow: {
        fontWeight: 500,
    },
    header: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 15,
        fontWeight: 500,
    },
    pairsPanel: {
        marginBottom: 40,
    }
});

const parametersPresentation = [
    new PropertyPresentation('First Sequence', 'sequenceA'),
    new PropertyPresentation('Second Sequence', 'sequenceB'),
    new PropertyPresentation('Alignment Type', 'alignmentType'),
    new PropertyPresentation('Scoring Matrix', 'scoringMatrixName'),
    new PropertyPresentation('Open Gap Penalty', 'fixGapPenalty'),
    new PropertyPresentation('Extension Gap Penalty', 'varGapPenalty'),
    new PropertyPresentation('Minimum Score', 'minScore'),
    new PropertyPresentation('Maximum Number of Solutions', 'maxNumberOfSolutions'),
];

export const solutionPresentations = (percentageValueFormatter) => [
    new PropertyPresentation('Score', 'score'),
    new PropertyPresentation('E-Value', 'score', value => value.toExponential(1)),
    new PropertyPresentation('Positives', 'positives'),
    new PropertyPresentation('% Positives', 'positivesPercentage', percentageValueFormatter),
    new PropertyPresentation('Identities', 'identities'),
    new PropertyPresentation('% Identities', 'identitiesPercentage', percentageValueFormatter),
    new PropertyPresentation('Length', '', sol => sol.alignedSequences.length),
];

const visualSolutionPresentation = solutionPresentations(value => 
    <PercentageBar 
        horizontalBar
        size={200}
        percentage={value} 
        color={new RgbaColor(0, 0, 180, 0.5)} 
        backgroundColor={new RgbaColor(180, 180, 180, 0.5)} 
    />
);

const Solution = ({ classes, descriptor, solution }) => {
    const [colored, setColored] = useState(true);
    return (
        <div className={classes.root}>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Parameters</Typography>
                    <Typography className={classes.secondaryHeading}>Parameters used to compute this solution</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <PresentationPairs presentation={parametersPresentation} record={descriptor} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Scoring Values</Typography>
                    <Typography className={classes.secondaryHeading}></Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <PresentationPairs presentation={visualSolutionPresentation} record={solution} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary>
                    <Typography className={classes.heading}>
                    Solution Alignment
                    <Switch
                        checked={colored}
                        onChange={e => setColored(e.target.checked)}
                        color="primary"
                    />
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <SolutionAlignment 
                        colored={colored} 
                        positiveColor={new RgbaColor(0, 200, 0)} 
                        negativeColor={new RgbaColor(250, 0, 0)} 
                        solution={solution} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}

Solution.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Solution);
